'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import Link from 'next/link'
import { RootState } from '@/app/redux/store/rootReducer' // adjust the import path as necessary
import { fetchStreamResult } from '@/app/redux/slice/streamResultSlice' // adjust the import path as necessary
import { store } from '../redux/store/configureStore'
import Video from 'next-video'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Watch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchInner />
    </Suspense>
  )
}

function WatchInner() {
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const v = searchParams.get('v')
  const playerRef = useRef(null)

  const stream = useSelector((state: RootState) => state.streamResult)
  const streamStatus = useSelector(
    (state: RootState) => state.streamResult.status,
  )

  // Fetch stream data when component mounts
  useEffect(() => {
    if (v) {
      dispatch(fetchStreamResult(v))
    }
  }, [dispatch, v])

  return (
    <div>
      {streamStatus === 'loading' && <div>Loading...</div>}
      {streamStatus === 'succeeded' && (
        <>
          <h1>{stream.item.title}</h1>
          {stream.item.hls && (
            <div>
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}${stream.item.hls}`}>
                <p>m3u8</p>
              </Link>
              <Video
                src={`${process.env.NEXT_PUBLIC_API_URL}${stream.item.hls}`}
              />
            </div>
          )}
        </>
      )}
      {streamStatus === 'failed' && <div>Error: {stream.error}</div>}
    </div>
  )
}
