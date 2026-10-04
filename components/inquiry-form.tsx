'use client'

import { FormEvent, useState } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

type InquiryFormProps = {
  product?: string
  scopeLabel?: string
}

export function InquiryForm({ product, scopeLabel = 'inquiry' }: InquiryFormProps) {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setPending(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/inquiry/', {
        method: 'POST',
        body: data,
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(payload.error || 'Could not send your inquiry. Please try again.')
        setRefreshKey((value) => value + 1)
        return
      }
      form.reset()
      setMessage('Thank you. Your inquiry has been sent. We will reply by email.')
      setRefreshKey((value) => value + 1)
    } catch {
      setError('Could not send your inquiry. Please try again.')
      setRefreshKey((value) => value + 1)
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="hq-form" onSubmit={onSubmit}>
      {product ? <input type="hidden" name="product" value={product} /> : null}
      <input type="hidden" name="source" value={scopeLabel} />
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Phone
        <input name="phone" autoComplete="tel" />
      </label>
      <label>
        Company
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        Message
        <textarea name="message" required rows={5} defaultValue={product ? `I would like a quote for ${product}.` : ''} />
      </label>
      <InquiryCaptchaField refreshKey={refreshKey} />
      <button type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send inquiry'}</button>
      {message ? <p className="hq-form-ok" role="status">{message}</p> : null}
      {error ? <p className="hq-form-err" role="alert">{error}</p> : null}
    </form>
  )
}
