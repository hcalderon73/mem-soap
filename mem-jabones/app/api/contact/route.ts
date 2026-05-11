import { NextResponse } from 'next/server';

// Check if Resend API key is configured
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    // Check if API key is available
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    // Dynamically import resend only when needed
    const { sendContactEmail } = await import('@/lib/resend');

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendContactEmail({ name, email, message });

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
