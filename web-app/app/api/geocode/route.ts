import { NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const response = await client.geocode({
      params: {
        address: address as string,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
    })

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location
      return NextResponse.json({ lat, lng })
    } else {
      return NextResponse.json({ error: 'No results found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error in geocoding:', error)
    return NextResponse.json({ 
      error: 'Failed to geocode address',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

