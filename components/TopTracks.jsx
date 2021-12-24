import useSWR from 'swr';

import fetcher from 'lib/fetcher';

export default function Tracks() {
    const { data, error } = useSWR('/api/top-tracks', fetcher);
    if (error) {
        console.error({error})
        return <p>Error, please try again later</p>
    }
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
