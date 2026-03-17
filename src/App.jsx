import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import ScrollProgressBar from './components/ScrollProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import WhatWeAutomate from './components/WhatWeAutomate'
import UserJourneyDarkHorizontal from './components/UserJourneyDarkHorizontal'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ROICalculator = lazy(() => import('./pages/ROICalculator'))
const Process = lazy(() => import('./pages/Process'))

function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <Loader onComplete={() => setLoaderDone(true)} />
      <ScrollProgressBar />
      <Navbar ready={loaderDone} />
      <Hero ready={loaderDone} />
      <UserJourneyDarkHorizontal />
      <WhatWeAutomate />
      <Protocol />
      <Pricing />
      <Features />
      <FAQ />
      <Contact />
      <Footer />
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
      </Routes>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
