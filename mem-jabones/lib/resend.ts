import { Resend } from 'resend';

// Lazy initialization - only create Resend instance when needed
let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Get email configuration from environment variables
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'contacto@mem-jabones.com';

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const resendClient = getResend();
    
    const data = await resendClient.emails.send({
      from: `MEM Jabones <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
