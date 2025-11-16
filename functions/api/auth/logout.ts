export async function onRequestPost(context: any) {
  const { request, env } = context
  const sessionId = request.headers.get('Cookie')?.match(/session=([^;]+)/)?.[1]
  
  if (sessionId) {
    await env.DB.prepare('DELETE FROM sessions WHERE session_id = ?').bind(sessionId).run()
  }
  
  const response = new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
  response.headers.set('Set-Cookie', 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0')
  return response
}

