import Image from "next/image";
import useSWR from "swr";
import fetcher from "lib/fetcher";

export default function NowPlaying() {
  const ops = { refreshInterval: 4500 }; // 4 seconds
  const { data, error } = useSWR("/api/now-playing", fetcher, ops);
  const { albumImageUrl, artist, title, isPodcast, isPlaying } = data || {};

  if (error) return <p>error</p>;
  if (!data) return <p>loading...</p>;
  if (isPodcast) return <p>Podcast playing</p>;
  if (!isPlaying) return <p>Nowt Playing</p>;

  return (
    <div>
      <Image
        src={albumImageUrl}
        alt={title}
        width={600}
        height={600}
        layout="fixed"
        className="block shadow-outline self-center"
      />
      <p>
        {title} by {artist}
      </p>
    </div>
  );
}
