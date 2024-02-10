'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Searching for', searchQuery)
    router.push(`/results?search_query=${encodeURIComponent(searchQuery)}`) // Navigate to results page with search query
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg">AltTube</div>
        {/* This div acts as a spacer to allow centering of the form */}
        <div className="flex-1"></div>
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center flex-1"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-grow p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-black bg-white" // Adjusted for text visibility
          />
          <button
            type="submit"
            className="bg-purple-600 p-2 rounded-r-md hover:bg-purple-700"
          >
            Search
          </button>
        </form>
        {/* Another spacer div to keep the form centered */}
        <div className="flex-1"></div>
      </div>
    </nav>
  )
}

export default NavBar
