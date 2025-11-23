import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { nombre, email, telefono, tipoContacto, mensaje } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto (${tipoContacto})`,
      text: `
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Tipo de contacto: ${tipoContacto}

Mensaje:
${mensaje}
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
