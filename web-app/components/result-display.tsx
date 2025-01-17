import { Flame } from 'lucide-react'

interface ResultDisplayProps {
  address: string
  risk: string
  probability: number
}

export default function ResultDisplay({ address, risk, probability }: ResultDisplayProps) {
  const getAlertVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-500 text-green-900'
      case 'medium':
        return 'bg-yellow-500 text-yellow-900'
      case 'high':
        return 'bg-red-500 text-red-900'
      default:
        return 'bg-gray-500 text-gray-900'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-lg p-8">
      <div className={`w-48 h-48 rounded-full flex items-center justify-center ${getAlertVariant(risk)}`}>
        <Flame className="h-24 w-24" />
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Fire Risk Prediction</h2>
        <p className="mb-2 text-gray-300">Address: <strong className="text-white">{address}</strong></p>
        <p className="mb-2 text-gray-300">The predicted fire risk is: <strong className="text-2xl text-white">{risk}</strong></p>
        <p className="text-gray-300">Probability: <strong className="text-white">{(probability * 100).toFixed(2)}%</strong></p>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
        <div 
          className={`h-4 rounded-full ${getAlertVariant(risk)}`}
          style={{ width: `${probability * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

