import AddressForm from '@/components/address-form'
import NavBar from '@/components/nav-bar'
import { Flame } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center p-8 md:p-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            <span className="block">Marsh</span>
            <span className="block">Fire Risk Prediction</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Predict potential fire risks in your area using advanced AI technology and satellite imagery.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <AddressForm />
        </div>
        <div className="mt-16 flex items-center justify-center space-x-8 text-gray-400">
          <div className="flex flex-col items-center">
            <Flame size={32} className="mb-2 text-orange-500" />
            <p>Advanced AI</p>
          </div>
          <div className="flex flex-col items-center">
            <Flame size={32} className="mb-2 text-orange-500" />
            <p>Real-time Data</p>
          </div>
          <div className="flex flex-col items-center">
            <Flame size={32} className="mb-2 text-orange-500" />
            <p>Precise Predictions</p>
          </div>
        </div>
      </main>
    </div>
  )
}

