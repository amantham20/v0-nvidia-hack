"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebounce } from 'use-debounce'
import { useToast } from "@/components/ui/use-toast"

interface Prediction {
  description: string;
  place_id: string;
}

export default function AddressForm() {
  const [address, setAddress] = useState('')
  const [debouncedAddress] = useDebounce(address, 300)
  const [suggestions, setSuggestions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSuggestions() {
      if (!debouncedAddress) {
        setSuggestions([])
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(debouncedAddress)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setSuggestions(data)
        } else {
          console.error('Unexpected response format:', data)
          setSuggestions([])
        }
      } catch (error) {
        console.error('Error fetching autocomplete:', error)
        toast({
          title: "Error",
          description: "Failed to fetch address suggestions. Please try again.",
          variant: "destructive",
        })
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }

    fetchSuggestions()
  }, [debouncedAddress, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter an address",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      if (data.lat && data.lng) {
        router.push(`/results?address=${encodeURIComponent(address)}&lat=${data.lat}&lng=${data.lng}&risk=Medium`)
      } else {
        throw new Error(data.error || 'Failed to geocode address')
      }
    } catch (error) {
      console.error('Error during form submission:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process address. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter a location address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-800 border-gray-700 text-white py-8 px-12 text-4xl shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg mt-2 shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                  onClick={() => {
                    setAddress(suggestion.description)
                    setSuggestions([])
                  }}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
          <Button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <span>Get Fire Risk Prediction</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

