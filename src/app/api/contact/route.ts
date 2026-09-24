import { NextResponse } from 'next/server'

type Body = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email looks off.' }, { status: 400 })
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: 'Message is a bit long. Edit down?' },
      { status: 400 }
    )
  }

  // Hook up Resend / Formspree / SMTP later. Logged for now.
  console.info('[contact]', { name, email, message: message.slice(0, 200) })

  return NextResponse.json({ ok: true })
}
