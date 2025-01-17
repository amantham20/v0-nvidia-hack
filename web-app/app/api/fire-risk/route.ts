import { NextResponse } from 'next/server'

// This is a mock function. Replace it with your actual model prediction logic.
function predictFireRisk(lat: number, lng: number): { risk: string; probability: number } {
  // Mock prediction logic
  const random = Math.random()
  let risk: string
  let probability: number

  if (random < 0.3) {
    risk = 'Low'
    probability = random
  } else if (random < 0.7) {
    risk = 'Medium'
    probability = random
  } else {
    risk = 'High'
    probability = random
  }

  return { risk, probability }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'Invalid latitude or longitude' }, { status: 400 })
  }

  try {
    const prediction = predictFireRisk(lat, lng)
    return NextResponse.json(prediction)
  } catch (error) {
    console.error('Error predicting fire risk:', error)
    return NextResponse.json({ error: 'Failed to predict fire risk' }, { status: 500 })
  }
}

