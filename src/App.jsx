import { useState, lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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
const BusinessAuditV2 = lazy(() => import('./pages/BusinessAuditV2'))
const AuditReport = lazy(() => import('./pages/AuditReport'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const MissedRevenueAudit = lazy(() => import('./pages/MissedRevenueAudit'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Resources = lazy(() => import('./pages/Resources'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))

// Brand colors — match exact section backgrounds
const LIGHT         = '#F7F3ED'
const DARK_WARM_END = '#161614'  // CalculatorTeaser gradient tail
const PRICING_BG    = '#1a1816'  // Pricing warm-dark
const DARK_BASE     = '#1C1C1A'  // ProofStrip / Contact / Footer

function LoadingSpinner() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: LIGHT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '2px solid transparent',
        borderTopColor: '#8FAF9F',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function NotFound() {
  return (
    <div style={{ backgroundColor: LIGHT, minHeight: '100vh' }}>
      <Navbar ready />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 72px)',
        fontFamily: 'DM Sans, sans-serif',
        color: '#1C1C1A',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        <p style={{ fontSize: 96, fontWeight: 300, margin: '0 0 8px', lineHeight: 1, color: '#8FAF9F' }}>404</p>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 16px' }}>Page not found</h1>
        <p style={{ fontSize: 16, color: '#6B6B68', margin: '0 0 40px', maxWidth: 360 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            border: '1.5px solid #8FAF9F',
            borderRadius: 6,
            color: '#1C1C1A',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '0.02em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#8FAF9F22' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

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
        <Route path="/about" element={<Suspense fallback={<LoadingSpinner />}><About /></Suspense>} />
        <Route path="/services" element={<Suspense fallback={<LoadingSpinner />}><Services /></Suspense>} />
        <Route path="/roi" element={<Suspense fallback={<LoadingSpinner />}><ROICalculator /></Suspense>} />
        <Route path="/process" element={<Suspense fallback={<LoadingSpinner />}><Process /></Suspense>} />
        <Route path="/stats" element={<Suspense fallback={<LoadingSpinner />}><Stats /></Suspense>} />
        <Route path="/lp" element={<Suspense fallback={<LoadingSpinner />}><LandingPage /></Suspense>} />
        <Route path="/audit" element={<Suspense fallback={<LoadingSpinner />}><BusinessAuditV2 /></Suspense>} />
        <Route path="/audit-v2" element={<Suspense fallback={<LoadingSpinner />}><BusinessAuditV2 /></Suspense>} />
        <Route path="/report" element={<Suspense fallback={<LoadingSpinner />}><AuditReport /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<LoadingSpinner />}><ContactPage /></Suspense>} />
        <Route path="/missed-revenue" element={<Suspense fallback={<LoadingSpinner />}><MissedRevenueAudit /></Suspense>} />
        <Route path="/case-study" element={<Suspense fallback={<LoadingSpinner />}><CaseStudies /></Suspense>} />
        <Route path="/resources" element={<Suspense fallback={<LoadingSpinner />}><Resources /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={<LoadingSpinner />}><PrivacyPolicy /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={<LoadingSpinner />}><TermsOfService /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense>} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
