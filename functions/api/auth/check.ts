export async function onRequestGet(context: any) {
  const { request, env } = context
  const sessionId = request.headers.get('Cookie')?.match(/session=([^;]+)/)?.[1]
  
  if (!sessionId) {
    return new Response(JSON.stringify({ authenticated: false }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const session: any = await env.DB.prepare(
    'SELECT user_id FROM sessions WHERE session_id = ?'
  ).bind(sessionId).first()
  
  return new Response(JSON.stringify({ authenticated: !!session }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

