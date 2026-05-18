'use client'
import dynamic from 'next/dynamic'
const StillWaves = dynamic(() => import('@/components/visuals/StillWaves'), { ssr: false })
export default StillWaves
