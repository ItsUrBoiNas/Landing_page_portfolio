import { Resend } from 'resend'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string
  fromName?: string
}

let resendClient: Resend | null = null

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resendClient) {
      const key = process.env.RESEND_API_KEY
      if (!key) {
        throw new Error('Resend API key is not configured')
      }
      resendClient = new Resend(key)
    }

    const from = options.from || process.env.DEFAULT_FROM_EMAIL || 'onboarding@resend.dev'
    const fromName = options.fromName || process.env.DEFAULT_FROM_NAME || 'Landing Page Portfolio'

    const { error } = await resendClient.emails.send({
      from: `${fromName} <${from}>`,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

