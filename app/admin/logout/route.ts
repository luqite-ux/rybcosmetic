import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login/', request.url), 303)
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  response.cookies.set('hq_tenant_id', '', { path: '/', maxAge: 0 })
  return response
}
