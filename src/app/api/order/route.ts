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
}

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
      from: "AMULET Comenzi <onboarding@resend.dev>",
      to: "amulet@amulet.ro",
      replyTo: data.email || undefined,
      subject: `${subjectPrefix ?? "AMULET comandă"} – ${name}`,
      text: bodyText,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
