import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import ScrollProgressBar from './components/ScrollProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import WhatWeAutomate from './components/WhatWeAutomate'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import About from './pages/About'
import Services from './pages/Services'
import ROICalculator from './pages/ROICalculator'
import Process from './pages/Process'

function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <Loader onComplete={() => setLoaderDone(true)} />
      <ScrollProgressBar />
      <Navbar ready={loaderDone} />
      <Hero ready={loaderDone} />
      <Protocol />
      <WhatWeAutomate />
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/roi" element={<ROICalculator />} />
      <Route path="/process" element={<Process />} />
    </Routes>
  )
}
