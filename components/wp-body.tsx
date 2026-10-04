import { InquiryForm } from '@/components/inquiry-form'

export function WpBody({ html }: { html: string }) {
  if (!html.includes('<!--HQ_FORM-->')) {
    return <div className="wp-site-content" dangerouslySetInnerHTML={{ __html: html }} />
  }
  const [before, after] = html.split('<!--HQ_FORM-->')
  return (
    <div className="wp-site-content">
      <div dangerouslySetInnerHTML={{ __html: before }} />
      <InquiryForm scopeLabel="contact" />
      <div dangerouslySetInnerHTML={{ __html: after || '' }} />
    </div>
  )
}
