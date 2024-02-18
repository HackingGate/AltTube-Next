import { useEffect, useRef } from 'react'

import 'plyr/dist/plyr.css'
import Hls from 'hls.js'
import Plyr, { APITypes, PlyrProps, PlyrInstance } from 'plyr-react'

interface HLSProps {
  src: string
}
const HLS: React.FC<HLSProps> = ({ src = '' }) => {
  const ref = useRef<APITypes>(null)
  useEffect(() => {
    const loadVideo = async () => {
      const video = document.getElementById('plyr') as HTMLVideoElement
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      // @ts-ignore
      ref.current!.plyr.media = video

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        ;(ref.current!.plyr as PlyrInstance).play()
      })
    }
    loadVideo().then((r) => {})
  })

  return (
    <Plyr
      id="plyr"
      options={{ volume: 1.0 }}
      source={{} as PlyrProps['source']}
      ref={ref}
    />
  )
}

export default HLS
