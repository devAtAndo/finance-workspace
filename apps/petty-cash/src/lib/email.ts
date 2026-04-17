// Email is intentionally stubbed on Cloudflare Workers for the initial deploy.
// nodemailer is Node-only and can't run in the Worker runtime. A follow-up
// swap to Cloudflare Email Workers or Resend will reinstate real delivery.
//
// For now every sendEmail call is logged so finance teams can look up what
// would have been sent via wrangler tail / the Cloudflare logs dashboard.

export interface EmailOpts {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(opts: EmailOpts): Promise<void> {
  const isDev = process.env.NODE_ENV !== 'production';
  const from = process.env.SMTP_FROM || 'Petty Cash <no-reply@andofoods.co>';

  if (isDev && process.env.SMTP_HOST) {
    // Local dev only: lazy-load nodemailer so it never reaches the Worker bundle.
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    await transporter.sendMail({ from, ...opts });
    return;
  }

  // Production / Workers: log-only. Follow-up phase wires real delivery.
  console.info('[email:stub]', JSON.stringify({ from, to: opts.to, subject: opts.subject }));
}
