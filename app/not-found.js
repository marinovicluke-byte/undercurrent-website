// app/not-found.js
import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-body text-blue uppercase tracking-widest">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-6 max-w-sm text-muted">
        That page doesn&apos;t exist. It may have moved, or the URL might be wrong.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-charcoal px-6 py-3 text-sm font-body text-white hover:bg-blue transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
