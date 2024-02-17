'use client'

import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchSearchResults, SearchResultItem } from '@/app/redux/store/searchResultsSlice'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsInner />
    </Suspense>
  )
}

function ResultsInner() {
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const search_query = searchParams.get('search_query')

  const searchResults = useSelector(
    (state: RootState) => state.searchResults.items,
  )
  const searchStatus = useSelector(
    (state: RootState) => state.searchResults.status,
  )

  // Fetch data when component mounts or search_query changes
  useEffect(() => {
    if (search_query) {
      dispatch(fetchSearchResults({ query: search_query }))
    }
  }, [dispatch, search_query])

  return (
    <div>
      <h1>Results for {search_query}</h1>
      {searchStatus === 'loading' && <div>Loading...</div>}
      {searchStatus === 'succeeded' &&
        searchResults &&
        searchResults.length > 0 &&
        searchResults.map((result: SearchResultItem, index: number) => (
          <Link href={result.url} key={index}>
            <div className={'mt-4 p-4'}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${result.thumbnail}`}
                alt={`Thumbnail for ${result.title}`}
                width={360}
                height={240}
              />
              <h2>{result.title}</h2>
            </div>
          </Link>
        ))}
      {searchStatus === 'failed' && <div>Error fetching results.</div>}
    </div>
  )
}
