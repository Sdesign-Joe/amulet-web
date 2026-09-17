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
}

const CUSTOMER_EMAIL_COPY = {
  ro: {
    subject: "Comanda ta AMULET a fost primită",
    greeting: (name: string) => `Bună, ${name}!`,
    intro:
      "Îți mulțumim pentru comandă! Te vom contacta în curând la numărul de telefon furnizat pentru confirmare. Plata se face la livrare.",
    summary: "Rezumatul comenzii:",
    total: "Total",
    footer: "AMULET · Birta Impex SRL · +40 741 597 436 · amulet@amulet.ro",
  },
  hu: {
    subject: "Az AMULET rendelésed megérkezett",
    greeting: (name: string) => `Kedves ${name}!`,
    intro:
      "Köszönjük a rendelésed! Hamarosan felvesszük veled a kapcsolatot a megadott telefonszámon a visszaigazoláshoz. A fizetés kiszállításkor történik.",
    summary: "Rendelés összegzése:",
    total: "Összesen",
    footer: "AMULET · Birta Impex SRL · +40 741 597 436 · amulet@amulet.ro",
  },
} as const;

export async function POST(request: Request) {
  const data = (await request.json()) as Partial<OrderPayload>;
  const { name, phone, city, address, lines, totalLabel, totalRon, subjectPrefix } =
    data;

  if (
    !name ||
    !phone ||
    !city ||
    !address ||
    !Array.isArray(lines) ||
    lines.length === 0 ||
    typeof totalRon !== "number"
  ) {
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
      const copy =
        CUSTOMER_EMAIL_COPY[data.locale === "hu" ? "hu" : "ro"];
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
