import Image from 'next/image'
import { useState } from 'react'

interface LocationDisplayProps {
  address: string
  lat: number
  lng: number
}

export default function LocationDisplay({ address, lat, lng }: LocationDisplayProps) {
  const [zoom, setZoom] = useState(15)
  const satelliteUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=800x600&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseInt(event.target.value))
  }

  return (
    <div className="space-y-4 rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-10">
      <div>
        <h3 className="text-lg font-semibold mb-2 px-4 py-2 bg-gray-800 text-white">Satellite View</h3>
        <div className="relative">
          <Image src={satelliteUrl || "/placeholder.svg"} alt="Satellite view" width={800} height={600} className="w-full h-auto" />
          <input
            type="range"
            min="14"
            max="20"
            value={zoom}
            onChange={handleZoomChange}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/2"
          />
        </div>
      </div>
      <div className="px-4 py-2">
        <h4 className="text-lg font-semibold mb-2 text-white">Location Details</h4>
        <p className="text-gray-300">Address: <strong className="text-white">{address}</strong></p>
        <p className="text-gray-300">Latitude: <strong className="text-white">{lat.toFixed(6)}</strong></p>
        <p className="text-gray-300">Longitude: <strong className="text-white">{lng.toFixed(6)}</strong></p>
      </div>
    </div>
  )
}

