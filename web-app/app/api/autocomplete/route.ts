import { NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client({})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get('input')

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 })
  }

  try {
    const response = await client.placeAutocomplete({
      params: {
        input: input as string,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
        components: ['country:us'],
        types: ['address'],
      },
    })

    // Ensure we're returning a properly formatted JSON response
    return NextResponse.json(response.data.predictions)
  } catch (error) {
    console.error('Error in autocomplete:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch autocomplete results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

