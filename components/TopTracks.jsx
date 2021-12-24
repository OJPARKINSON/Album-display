import useSWR from 'swr';

import fetcher from 'lib/fetcher';

export default function Tracks() {
    const { data, error } = useSWR('/api/top-tracks', fetcher);
    if (!data || error) {
        console.error({error})
        return <p>Error, please try again later</p>
    }
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
