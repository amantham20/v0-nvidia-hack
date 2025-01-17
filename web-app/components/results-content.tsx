'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultDisplay from '@/components/result-display'
import LocationDisplay from '@/components/location-display'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

interface FireRiskData {
  risk: string
  probability: number
}

export default function ResultsContent() {
  const searchParams = useSearchParams()
  const address = searchParams.get('address') || ''
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  const [fireRiskData, setFireRiskData] = useState<FireRiskData | null>(null)

  useEffect(() => {
    const fetchFireRiskData = async () => {
      try {
        const response = await fetch(`/api/fire-risk?lat=${lat}&lng=${lng}`)
        const data = await response.json()
        setFireRiskData(data)
      } catch (error) {
        console.error('Error fetching fire risk data:', error)
      }
    }

    fetchFireRiskData()
  }, [lat, lng])

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-8 pt-24 relative">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-8">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            Prediction Results
          </h1>
          {fireRiskData && (
            <ResultDisplay 
              address={address} 
              risk={fireRiskData.risk} 
              probability={fireRiskData.probability} 
            />
          )}
          <div className="text-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                New Prediction
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <LocationDisplay address={address} lat={lat} lng={lng} />
        </div>
      </div>
    </main>
  )
}

