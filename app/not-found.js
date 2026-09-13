// app/not-found.js — the 404 on the plain text template
import PlainPage from '@/components/site/PlainPage'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <PlainPage title="Not found">
      <p>That page doesn&apos;t exist. It may have moved, or the address might be wrong.</p>
      <p><a href="/">Back to the homepage</a>, or <a href="/blog">read the blog</a>.</p>
    </PlainPage>
  )
}
