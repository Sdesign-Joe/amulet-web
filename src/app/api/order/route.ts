import { NextResponse } from "next/server";
import { Resend } from "resend";

interface OrderPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  lines: string[];
  totalLabel: string;
  totalRon: number;
  subjectPrefix: string;
  locale?: string;
  consent?: boolean;
  /** Honeypot: a hidden field real users never fill in. */
  website?: string;
}

const LIMITS = {
  name: 100,
  phone: 25,
  email: 200,
  city: 60,
  address: 250,
  notes: 600,
  line: 300,
  maxLines: 20,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Always sent in Romanian, regardless of which locale the customer browsed
// in — this is a deliberate business decision, not a translation gap.
const CUSTOMER_EMAIL_COPY = {
  subject: "Comanda ta AMULET a fost primită",
  greeting: (name: string) => `Bună, ${name}!`,
  intro:
    "Îți mulțumim pentru comandă! Te vom contacta în curând la numărul de telefon furnizat pentru confirmare. Plata se face la livrare.",
  summary: "Rezumatul comenzii:",
  total: "Total",
  footer: "AMULET · Birta Impex SRL · +40 741 597 436 · amulet@amulet.ro",
};

export async function POST(request: Request) {
  const data = (await request.json()) as Partial<OrderPayload>;
  const { name, phone, city, address, lines, totalLabel, totalRon, subjectPrefix } =
    data;

  // Honeypot: bots tend to fill every field; real users never see or fill
  // this one. Pretend success without sending anything.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !name ||
    !phone ||
    !city ||
    !address ||
    !data.consent ||
    !Array.isArray(lines) ||
    lines.length === 0 ||
    typeof totalRon !== "number"
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    phone.length > LIMITS.phone ||
    city.length > LIMITS.city ||
    address.length > LIMITS.address ||
    (data.notes && data.notes.length > LIMITS.notes) ||
    (data.email && data.email.length > LIMITS.email) ||
    lines.length > LIMITS.maxLines ||
    lines.some((line) => typeof line !== "string" || line.length > LIMITS.line)
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (data.email && !EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const bodyText = [
    `Nume: ${name}`,
    `Telefon: ${phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Localitate: ${city}`,
    `Adresă: ${address}`,
    "",
    ...lines,
    "",
    `${totalLabel}: ${totalRon.toFixed(2)} RON`,
    data.notes ? `Observații: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "AMULET Comenzi <comenzi@amulet.ro>",
      to: "amulet@amulet.ro",
      replyTo: data.email || undefined,
      subject: `${subjectPrefix ?? "AMULET comandă"} – ${name}`,
      text: bodyText,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    if (data.email) {
      const copy = CUSTOMER_EMAIL_COPY;
      const customerBody = [
        copy.greeting(name),
        "",
        copy.intro,
        "",
        copy.summary,
        ...lines,
        "",
        `${copy.total}: ${totalRon.toFixed(2)} RON`,
        "",
        copy.footer,
      ].join("\n");

      const { error: customerError } = await resend.emails.send({
        from: "AMULET <comenzi@amulet.ro>",
        to: data.email,
        subject: copy.subject,
        text: customerBody,
      });

      if (customerError) {
        // Don't fail the whole order if only the customer confirmation
        // fails to send — the business already has the order.
        console.error("Customer confirmation email failed", customerError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
