import { Suspense } from 'react'
import ResultsContent from '@/components/results-content'
import NavBar from '@/components/nav-bar'

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <NavBar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center text-white">Loading...</div>}>
        <ResultsContent />
      </Suspense>
    </div>
  )
}

