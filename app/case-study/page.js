import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

export const metadata = {
  title: 'Case Studies',
  description: "See how we've helped Australian businesses save time and scale with AI automation.",
}

export default function CaseStudyPage() {
  return (
    <div className="bg-charcoal pt-24 pb-section min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}
        <FadeIn>
          <p className="text-xs font-mono tracking-widest text-blue/70 mb-4">CASE STUDIES</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-none mb-8">
            AI Automation<br />
            <span className="text-blue">Case Studies.</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-white/60 max-w-prose">
            Real businesses. Real results. See how we&apos;ve helped small businesses reclaim their time and scale their operations with AI automation.
          </p>
        </FadeIn>

        {/* Coming soon card */}
        <FadeIn delay={150}>
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(143,175,159,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <p className="text-xs font-mono tracking-widest text-blue mb-4">COMING SOON</p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Case Studies Arriving Shortly</h2>
            <p className="text-sm font-light text-white/40 leading-relaxed max-w-sm mx-auto">
              We&apos;re documenting the results from our latest automation builds. Check back soon to see the impact.
            </p>
          </div>
        </FadeIn>

        {/* Related links */}
        <FadeIn delay={200}>
          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            {[
              { href: '/roi', label: 'ROI Calculator', desc: 'See exactly how much time and money AI automation can save your business.' },
              { href: '/audit', label: 'Free Business Audit', desc: 'Get a personalised breakdown of where your business is leaking time.' },
              { href: '/contact', label: 'Get in Touch', desc: "Ready to talk? Reach out and let's discuss your automation needs." },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex-1 min-w-[200px] max-w-[280px] rounded-xl border border-white/10 p-5 hover:border-white/25 transition-colors"
              >
                <p className="text-sm font-medium text-white mb-1">{link.label}</p>
                <p className="text-xs font-light text-white/40 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </FadeIn>

      </div>
    </div>
  )
}
