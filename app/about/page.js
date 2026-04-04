import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'Meet the team behind UnderCurrent. Learn how we started, what drives our approach to business automation, and why small business owners trust us to redesign their workflows.',
}

const values = [
  {
    num: '01',
    title: 'Systems thinking',
    body: 'We see the whole picture before we touch a single tool. Every workflow is mapped end-to-end, where work enters, where it stalls, where it leaves. Only then do we build.',
  },
  {
    num: '02',
    title: 'Silent precision',
    body: "Great automation is invisible. You shouldn't feel a system running, you should just notice that things are getting done without you having to do them.",
  },
  {
    num: '03',
    title: 'Small teams, big leverage',
    body: "We work exclusively with small businesses because that's where automation has the most impact. One person doing the work of five is transformative at this scale.",
  },
  {
    num: '04',
    title: 'No black boxes',
    body: 'Every system we build is documented, handed over, and explained in plain language. We build confidence, not dependency.',
  },
]

const timeline = [
  { year: '2026', event: 'Founded in Melbourne. Started with what we knew best, consulting for small businesses that were drowning in busywork and missing the bigger picture.' },
  { year: 'NOW', event: 'Focused entirely on AI-powered automation. Helping small businesses reclaim time, remove friction, and build systems that actually run.', isCurrent: true },
]

export default function AboutPage() {
  return (
    <div className="bg-white pt-24 pb-section overflow-x-hidden">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <FadeIn>
          <p className="text-xs font-mono tracking-widest text-muted mb-4">ABOUT UNDERCURRENT</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal leading-none">
            An AI Automation Studio<br />
            <span className="text-blue">Built on Flow.</span>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-prose font-light leading-relaxed">
            UnderCurrent is a Melbourne-based automation studio. We work with small business owners who are good at what they do, and tired of everything else that comes with it.
          </p>
        </FadeIn>
      </section>

      {/* Mission */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <FadeIn className="md:col-span-4">
              <p className="text-xs font-mono tracking-widest text-blue mb-6">OUR MISSION</p>
              <p className="text-xs font-mono tracking-wider text-muted mb-6">EST. 2026 · MELBOURNE</p>
              <div className="grid grid-cols-2 gap-5 mt-4">
                {[
                  { num: '12+', label: 'tools we work with' },
                  { num: '100%', label: 'custom-built systems' },
                  { num: '1 team', label: 'dedicated to your ops' },
                  { num: '0 lock-in', label: 'no lock-in contracts' },
                ].map((s, i) => (
                  <div key={i} className="py-4 border-t border-border">
                    <div className="font-display text-3xl font-bold text-charcoal leading-none">{s.num}</div>
                    <div className="text-xs text-muted mt-1 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={150} className="md:col-span-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-8">
                Small businesses deserve smart systems.
              </h2>
              <div className="space-y-5 border-t border-border pt-8">
                <p className="text-lg font-light leading-relaxed text-muted">
                  Big companies have entire teams for admin, ops, content, and outreach. Small businesses don&apos;t. But that shouldn&apos;t mean doing it all yourself.
                </p>
                <p className="text-lg font-light leading-relaxed text-muted">
                  We build the systems that run in the background, so you can stay focused on the front.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <FadeIn className="md:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-charcoal to-blue/30 border border-white/10 p-10 text-center aspect-[4/5] flex items-center justify-center">
                <p className="font-display text-3xl font-light italic text-white/60 leading-snug">
                  &ldquo;The undercurrent is what moves everything forward.&rdquo;
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={150} className="md:col-span-7">
              <p className="text-xs font-mono tracking-widest text-blue/70 mb-6">FOUNDER · LUKE, MELBOURNE</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                UnderCurrent is the studio I wished I had in every job before this.
              </h2>
              <div className="space-y-5">
                <p className="text-base font-light leading-relaxed text-white/60">
                  I spent years inside small business and corporate teams, finance, sales, operations. In every environment, I watched the same thing happen: smart, capable people losing most of their day to tasks that didn&apos;t need a person.
                </p>
                <p className="text-base font-light leading-relaxed text-white/60">
                  I built UnderCurrent to fix that. Not with generic software. Not with templates. With systems that are actually designed around how your business works, and then handed over to run without you.
                </p>
                <p className="text-base font-light leading-relaxed text-white/60">
                  The undercurrent is what moves everything forward. It runs all day, all night, and you barely notice it&apos;s there.
                </p>
              </div>
              <div className="flex gap-4 mt-10">
                <Link href="/services" className="inline-block rounded-md px-6 py-3 text-sm font-medium border border-blue text-blue hover:bg-blue hover:text-white transition-colors">
                  See what we build
                </Link>
                <Link href="/contact" className="inline-block rounded-md px-6 py-3 text-sm font-medium border border-white/20 text-white/70 hover:border-white/40 transition-colors">
                  Get in touch
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-mono tracking-widest text-blue mb-3">OUR STORY</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-charcoal leading-none mb-16">
              How we got here.
            </h2>
          </FadeIn>
          <div className="relative border-l border-border ml-4 pl-8 space-y-12">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 100}>
                <div className="relative">
                  <div
                    className="absolute -left-10 top-1 rounded-full border-2"
                    style={{
                      width: item.isCurrent ? 14 : 10,
                      height: item.isCurrent ? 14 : 10,
                      backgroundColor: item.isCurrent ? '#8FAF9F' : '#D4C9B0',
                      borderColor: item.isCurrent ? '#8FAF9F' : '#D4C9B0',
                    }}
                  />
                  <span className="text-xs font-mono tracking-widest block mb-2" style={{ color: item.isCurrent ? '#8FAF9F' : 'rgba(28,28,26,0.3)' }}>
                    {item.year}
                  </span>
                  <p className="text-base font-light leading-relaxed text-muted max-w-lg" style={{ fontWeight: item.isCurrent ? 400 : 300 }}>
                    {item.event}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-mono tracking-widest text-blue mb-3">HOW WE THINK</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-charcoal leading-none mb-14">
              Four principles.<br />Everything follows.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {values.map((v, i) => (
              <FadeIn key={v.num} delay={i * 80}>
                <div className="bg-surface p-10 group hover:bg-white transition-colors">
                  <div className="flex items-start gap-6">
                    <span className="text-xs font-mono tracking-wider text-blue/60 mt-1 flex-shrink-0">{v.num}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-charcoal mb-3">{v.title}</h3>
                      <p className="text-sm font-light leading-relaxed text-muted">{v.body}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs font-mono tracking-widest text-muted mb-3">WORK WITH US</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic text-charcoal leading-tight mb-6">
                Ready to build your undercurrent?
              </h2>
              <p className="text-lg font-light leading-relaxed text-muted mb-10 max-w-prose">
                Book a 30-minute call. We&apos;ll map your biggest time drains and show you exactly what can be automated.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-block rounded-md bg-charcoal text-white px-8 py-3 text-sm font-medium hover:bg-blue transition-colors">
                  Book a Discovery Call
                </Link>
                <Link href="/services" className="inline-block rounded-md border border-charcoal text-charcoal px-8 py-3 text-sm font-medium hover:bg-surface transition-colors">
                  Explore our services
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
