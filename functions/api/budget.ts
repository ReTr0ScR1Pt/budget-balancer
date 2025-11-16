async function getUserId(request: Request, env: any): Promise<number | null> {
  const sessionId = request.headers.get('Cookie')?.match(/session=([^;]+)/)?.[1]
  if (!sessionId) return null
  
  const session: any = await env.DB.prepare(
    'SELECT user_id FROM sessions WHERE session_id = ?'
  ).bind(sessionId).first()
  
  return session?.user_id || null
}

export async function onRequestPost(context: any) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const entry = await request.json()
  
  await env.DB.prepare(
    'INSERT INTO budget_entries (user_id, type, category, amount, month, year, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    userId,
    entry.type,
    entry.category,
    entry.amount,
    entry.month,
    entry.year,
    entry.description || null
  ).run()
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function onRequestGet(context: any) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const url = new URL(request.url)
  const year = parseInt(url.searchParams.get('year') || String(new Date().getFullYear()))
  const months = parseInt(url.searchParams.get('months') || '12')
  
  const startMonth = 1
  const endMonth = months
  
  const entries: any = await env.DB.prepare(
    'SELECT * FROM budget_entries WHERE user_id = ? AND year = ? AND month >= ? AND month <= ? ORDER BY month, id'
  ).bind(userId, year, startMonth, endMonth).all()
  
  return new Response(JSON.stringify(entries.results || []), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function onRequestDelete(context: any) {
  const { request, env } = context
  const userId = await getUserId(request, env)
  
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()
  
  // Verify entry belongs to user
  const entry: any = await env.DB.prepare(
    'SELECT user_id FROM budget_entries WHERE id = ?'
  ).bind(id).first()
  
  if (!entry || entry.user_id !== userId) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  await env.DB.prepare('DELETE FROM budget_entries WHERE id = ?').bind(id).run()
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

