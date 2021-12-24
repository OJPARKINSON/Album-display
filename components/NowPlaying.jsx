import Image from 'next/image';
import useSWR from 'swr';

import fetcher from 'lib/fetcher';


export default function NowPlaying() {
    const {data} = useSWR('/api/now-playing', fetcher, {refreshInterval: 4500});

    return (
        <div>
            <div>
                {data?.albumImageUrl && (
                    <Image
                        src={data.albumImageUrl}
                        alt={data.title}
                        width={600}
                        height={600}
                        className="ml-2"
                    />
                )}
                <p>{data?.songUrl ? `${data?.title}` : "Not Playing"} by {data?.artist ?? 'Spotify'}</p>
            </div>
        </div>
    );
}