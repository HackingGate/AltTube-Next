'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setSearchQuery } from '../redux/slice/searchSlice'
import { RootState } from '../redux/store/rootReducer'
import { useState } from 'react'

const NavBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = new URLSearchParams(window.location.search)
  const urlSearchQuery = searchParams.get('search_query') || undefined

  const [urlSearchQueryState, setUrlSearchQueryState] = useState<
    string | undefined
  >(urlSearchQuery)

  // Use RootState to type the state parameter
  const searchQuery = useSelector((state: RootState) => state.search.query)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim() === '') return
    const encodedSearchQuery = encodeURIComponent(searchQuery).replace(
      /%20/g,
      '+',
    )
    router.push(`/results?search_query=${encodedSearchQuery}`)
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center flex-1"
      >
        <input
          type="text"
          value={urlSearchQueryState || searchQuery}
          onChange={(e) => {
            setUrlSearchQueryState(undefined)
            dispatch(setSearchQuery(e.target.value))
          }}
          placeholder="Search..."
          className="flex-grow p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-black bg-white"
        />
        <button
          type="submit"
          className="bg-purple-600 p-2 rounded-r-md hover:bg-purple-700"
        >
          Search
        </button>
      </form>
    </nav>
  )
}

export default NavBar
