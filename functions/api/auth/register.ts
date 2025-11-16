import { hashPassword } from '../../../lib/utils'

export async function onRequestPost(context: any) {
  const { request, env } = context
  const { email, password } = await request.json()
  
  try {
    const passwordHash = await hashPassword(password)
    
    await env.DB.prepare(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)'
    ).bind(email, passwordHash).run()
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Email already exists' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

