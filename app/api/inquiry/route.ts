import { NextResponse } from 'next/server'
import { createSupabaseCaptchaStore, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const form = await request.formData()
  const name = String(form.get('name') || '').trim()
  const email = String(form.get('email') || '').trim()
  const phone = String(form.get('phone') || '').trim()
  const company = String(form.get('company') || '').trim()
  const message = String(form.get('message') || '').trim()
  const product = String(form.get('product') || '').trim()
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() || ''
  const secret = process.env.CAPTCHA_SECRET?.trim() || ''
  const siteScope = process.env.CAPTCHA_SITE_SCOPE?.trim() || ''
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || ''
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ''
  if (!tenantId || !secret || !siteScope || !supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Inquiry service is not configured.' }, { status: 503 })
  }

  const captcha = await verifyCaptchaSubmission({
    secret,
    store: createSupabaseCaptchaStore({ supabaseUrl, serviceRoleKey }),
    tenantId,
    siteScope,
    scope: String(form.get('captchaScope') || ''),
    token: String(form.get('captchaToken') || ''),
    answer: String(form.get('captchaAnswer') || ''),
  })
  if (!captcha.ok) {
    return NextResponse.json({ error: '验证码错误或已失效，请换一张后重试' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.from('inquiries').insert({
    tenant_id: tenantId,
    name,
    email,
    phone,
    company,
    message: product ? `Product: ${product}\n\n${message}` : message,
    status: 'unread',
  }).select('id').single()
  if (error || !data) {
    return NextResponse.json({ error: 'Could not save your inquiry.' }, { status: 500 })
  }

  const admin = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/\/$/, '')
  const notifySecret = process.env.INQUIRY_NOTIFY_SECRET?.trim()
  if (admin && notifySecret) {
    await fetch(`${admin}/api/inquiries/notify`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-inquiry-notify-secret': notifySecret,
      },
      body: JSON.stringify({ tenantId, inquiryId: data.id }),
    }).catch(() => null)
  }
  return NextResponse.json({ ok: true })
}
