import { useEffect } from 'react'
import * as Vibrant from 'node-vibrant'
import Image from 'next/image'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'

export default function NowPlaying({ setPalette }) {
    const { data } = useSWR('/api/now-playing', fetcher, {
        refreshInterval: 4000,
    })
    useEffect(() => {
        if (data) {
            Vibrant.from(data.albumImageUrl).getPalette().then(setPalette)
        }
    }, [data])

    return (
        <div

        >
            <div>
                {data?.albumImageUrl && (
                    <Image
                        src={data.albumImageUrl}
                        alt={data.title}
                        width={600}
                        height={600}
                        layout="fixed"
                        className="block shadow-outline self-center"
                    />
                )}
                <p>
                    {data?.songUrl ? `${data?.title}` : 'Not Playing'} by{' '}
                    {data?.artist ?? 'Spotify'}
                </p>
            </div>
        </div>
    )
}
