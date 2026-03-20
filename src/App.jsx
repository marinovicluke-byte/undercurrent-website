import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import ScrollProgressBar from './components/ScrollProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProofStrip from './components/ProofStrip'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import CalculatorTeaser from './components/CalculatorTeaser'
import WhatWeAutomate from './components/WhatWeAutomate'
import Benefits from './components/Benefits'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WaveDivider from './components/WaveDivider'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ROICalculator = lazy(() => import('./pages/ROICalculator'))
const Process = lazy(() => import('./pages/Process'))
const Stats = lazy(() => import('./pages/Stats'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const BusinessAudit = lazy(() => import('./pages/BusinessAudit'))
const BusinessAuditV2 = lazy(() => import('./pages/BusinessAuditV2'))
const AuditReport = lazy(() => import('./pages/AuditReport'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Brand colors — match exact section backgrounds
const LIGHT         = '#F7F3ED'
const DARK_WARM_END = '#161614'  // CalculatorTeaser gradient tail
const PRICING_BG    = '#1a1816'  // Pricing warm-dark
const DARK_BASE     = '#1C1C1A'  // ProofStrip / Contact / Footer

function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <div style={{ backgroundColor: LIGHT, overflowX: 'hidden' }}>
      <Loader onComplete={() => setLoaderDone(true)} />
      <ScrollProgressBar />
      <Navbar ready={loaderDone} />

      {/* Hero handles its own bottom wave into ProofStrip */}
      <Hero ready={loaderDone} />
      <ProofStrip />
      <Benefits />
      <WhatWeAutomate />

      {/* WhatWeAutomate handles its own bottom wave into Protocol */}
      <Protocol />

      {/* Protocol (light) → Pricing (warm-dark) */}
      <WaveDivider from={LIGHT} to={PRICING_BG} height={80} flip />
      <Pricing />
      <CalculatorTeaser />

      {/* CalculatorTeaser has its own embedded bottom wave into FAQ (light) */}
      <FAQ />

      {/* FAQ (light) → Contact (charcoal) */}
      <WaveDivider from={LIGHT} to={DARK_BASE} height={80} flip />
      {/* Dark wrapper so footer border-radius corners blend seamlessly */}
      <div style={{ backgroundColor: '#1C1C1A' }}>
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Suspense fallback={null}><About /></Suspense>} />
        <Route path="/services" element={<Suspense fallback={null}><Services /></Suspense>} />
        <Route path="/roi" element={<Suspense fallback={null}><ROICalculator /></Suspense>} />
        <Route path="/process" element={<Suspense fallback={null}><Process /></Suspense>} />
        <Route path="/stats" element={<Suspense fallback={null}><Stats /></Suspense>} />
        <Route path="/lp" element={<Suspense fallback={null}><LandingPage /></Suspense>} />
        <Route path="/audit" element={<Suspense fallback={null}><BusinessAuditV2 /></Suspense>} />
        <Route path="/audit-v2" element={<Suspense fallback={null}><BusinessAuditV2 /></Suspense>} />
        <Route path="/report" element={<Suspense fallback={null}><AuditReport /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={null}><ContactPage /></Suspense>} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
