'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLikedVideos,
} from '../../redux/slice/like-video/likeVideoSlice'
import { store } from '@/app/redux/store/configureStore'
import { RootState } from '@/app/redux/store/rootReducer'
import Link from 'next/link'
import Image from 'next/image'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Likes() {
  const dispatch = useDispatch<AppDispatch>()

  const likeVideo = useSelector((state: RootState) => state.likeVideo)
  const likeVideoStatus = useSelector(
    (state: RootState) => state.likeVideo.status,
  )

  useEffect(() => {
    dispatch(fetchLikedVideos())
  }, [dispatch])

  return (
    <div>
      {likeVideoStatus === 'loading' && <div>Loading...</div>}
      {likeVideoStatus === 'succeeded' && (
        <div>
          <h1>Liked Videos</h1>
          {
            likeVideo.items === null && <div>No liked videos</div>
          }
          {likeVideo.items && likeVideo.items.length > 0 && likeVideo.items.map((video) => (
            <Link href={'/watch?v='+video.id} key={video.id}>
              <div className={'mt-4 p-4'}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${video.thumbnail_url}`}
                  alt={`Thumbnail for ${video.title}`}
                  width={360}
                  height={240}
                />
                <h2>{video.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}