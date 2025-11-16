import { hashPassword, verifyPassword } from '../../../lib/utils'

export async function onRequestPost(context: any) {
  const { request, env } = context
  const { email, password } = await request.json()
  
  const user: any = await env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first()
  
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Create session
  const sessionId = crypto.randomUUID()
  await env.DB.prepare(
    'INSERT INTO sessions (user_id, session_id) VALUES (?, ?)'
  ).bind(user.id, sessionId).run()
  
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
  response.headers.set('Set-Cookie', `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/`)
  return response
}

