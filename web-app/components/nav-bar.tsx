import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <Flame size={24} />
          <span className="text-xl font-bold">Marsh</span>
        </Link>
      </div>
    </nav>
  )
}

