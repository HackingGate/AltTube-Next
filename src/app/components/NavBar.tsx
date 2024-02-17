'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { setSearchQuery } from '../redux/slice/searchSlice'
import { RootState } from '../redux/store/rootReducer'
import { useState } from 'react'
import { debounce } from 'lodash'
import { fetchSearchSuggestions } from '@/app/redux/slice/searchSuggestionsSlice'
import { store } from '../redux/store/configureStore'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlSearchQuery = searchParams.get('search_query')

  const [urlSearchQueryState, setUrlSearchQueryState] = useState<
    string | null
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

  const debouncedSearchSuggestions = debounce((query: string) => {
    const encodedQuery = encodeURIComponent(query).replace(
      /%20/g,
      '+',
    )
    dispatch(fetchSearchSuggestions(encodedQuery))
  }, 500)

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
            setUrlSearchQueryState(null)
            dispatch(setSearchQuery(e.target.value))
            debouncedSearchSuggestions(e.target.value)
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
