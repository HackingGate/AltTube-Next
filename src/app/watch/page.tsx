'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/app/redux/store/rootReducer' // adjust the import path as necessary
import { fetchStreamResult } from '@/app/redux/slice/streamResultSlice' // adjust the import path as necessary
import { store } from '../redux/store/configureStore'
import Video from 'next-video'
import {
  addLikeVideo,
  fetchLikeVideo,
  removeLikeVideo,
} from '@/app/redux/slice/like-video/likeVideoSlice'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()
  const v = searchParams.get('v')

  const { accessToken } = useSelector((state: RootState) => state.user)
  const stream = useSelector((state: RootState) => state.streamResult)
  const streamStatus = useSelector(
    (state: RootState) => state.streamResult.status,
  )

  const likeVideo = useSelector((state: RootState) => state.likeVideo)
  const likeVideoStatus = useSelector(
    (state: RootState) => state.likeVideo.status,
  )

  useEffect(() => {
    if (v && accessToken) {
      dispatch(fetchLikeVideo({ videoID: v, accessToken: accessToken }))
    }
  }, [dispatch, v, accessToken])

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
          {v && likeVideo && (
            <button
              onClick={() => {
                if (accessToken) {
                  if (likeVideo.liked) {
                    dispatch(
                      removeLikeVideo({ videoID: v, accessToken: accessToken }),
                    )
                  } else {
                    dispatch(
                      addLikeVideo({ videoID: v, accessToken: accessToken }),
                    )
                  }
                } else {
                  alert('You must be logged in to like a video')
                  router.push('/user/login')
                }
              }}
            >
              {likeVideoStatus === 'loading'
                ? 'Loading...'
                : likeVideo.liked
                  ? 'Unlike'
                  : 'Like'}
            </button>
          )}
          {stream.item.hls && (
            <div>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}${stream.item.hls}`}
              >
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
