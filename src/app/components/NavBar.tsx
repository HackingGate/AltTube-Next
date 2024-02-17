'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { setSearchQuery } from '../redux/slice/searchSlice'
import { RootState } from '../redux/store/rootReducer'
import { useEffect, useRef, useState } from 'react'
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

  const {
    items: searchSuggestionItems,
  } = useSelector((state: RootState) => state.searchSuggestions)

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

  const [isFocused, setIsFocused] = useState(false)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center flex-1 mx-auto max-w-md w-full"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            value={urlSearchQueryState || searchQuery}
            onChange={(e) => {
              setUrlSearchQueryState(null)
              dispatch(setSearchQuery(e.target.value))
              debouncedSearchSuggestions(e.target.value)
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search..."
            className="w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-black bg-white"
          />
          {searchSuggestionItems.length > 0 && isFocused && (
            <ul
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false)
                if (!isFocused) {
                  dispatch(fetchSearchSuggestions(''))
                }
              }}
              className="absolute w-full bg-gray-100 text-black p-2 rounded-md shadow-lg min-h-[50px] max-h-[200px] overflow-auto"
            >
              {searchSuggestionItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`/results?search_query=${encodeURIComponent(item).replace(/%20/g, '+')}`}
                    className="block p-2 hover:bg-gray-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
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
