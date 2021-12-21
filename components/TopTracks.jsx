import useSWR from 'swr';

import fetcher from '../lib/fetcher';

export default function Tracks() {
    const {data} = useSWR('/api/top-tracks', fetcher);
    if (!data) return null
    const { tracks } = data;

    return (
        <ul>
            {tracks.map(({songUrl, title, artist}, index) => (
                <li key={songUrl}>
                    <p>
                        {index + 1}. {title} by {artist}
                    </p>
                </li>
            ))}
        </ul>
    );
}
