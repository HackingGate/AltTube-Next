'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import HlsPlayer from 'react-hls-player'
import { useRef } from 'react'
import Link from 'next/link'

type Stream = {
  title: string
  hls: string
}

export default function Watch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchInner />
    </Suspense>
  )
}

function WatchInner() {
  const searchParams = useSearchParams()
  const v = searchParams.get('v')
  const playerRef = useRef(null)

  const [stream, setStream] = useState<Stream>({
    title: '',
    hls: '',
  })

  // Fetch data when component mounts
  useEffect(() => {
    if (!v) return

    const fetchData = async () => {
      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/streams/${encodeURIComponent(v as string)}`
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setStream(await response.json())
    }

    fetchData().then(() => console.log('Fetched streams for video v=' + v))
  }, [v])

  return (
    <div>
      <h1>{stream.title}</h1>
      <Link href={`${process.env.NEXT_PUBLIC_API_URL}${stream.hls}`}>
        <p>Play in external player</p>
      </Link>
      {stream.hls.length > 0 && (
        <HlsPlayer
          src={`${process.env.NEXT_PUBLIC_API_URL}${stream.hls}`}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
          playerRef={playerRef}
        />
      )}
    </div>
  )
}
