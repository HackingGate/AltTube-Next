'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Suspense } from 'react'

type SearchResults = {
  items: Array<any>
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsInner />
    </Suspense>
  )
}

function ResultsInner() {
  const searchParams = useSearchParams()
  const search_query = searchParams.get('search_query')

  const [searchResults, setSearchResults] = useState<SearchResults>({
    items: [],
  })

  // Fetch data when component mounts
  useEffect(() => {
    if (!search_query) return

    const fetchData = async () => {
      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/piped/search?q=${encodeURIComponent(search_query as string)}`
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setSearchResults(await response.json())
    }

    fetchData().then(() => console.log('Fetched search results'))
  }, [search_query])

  return (
    <div>
      <h1>Results for {search_query}</h1>
      {searchResults.items &&
        searchResults.items.length > 0 &&
        searchResults.items.map((result, index) => (
          <div className={'mt-4 p-4'} key={index}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${result.thumbnail}`}
              alt={`Thumbnail for ${result.title}`}
              width={360}
              height={240}
            />
            <h2>{result.title}</h2>
          </div>
        ))}
    </div>
  )
}
