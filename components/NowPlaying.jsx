import Image from "next/image";
import useSWR from "swr";
import fetcher from "lib/fetcher";

function useAlbum() {
  const ops = { refreshInterval: 3000, refreshWhenHidden: true };
  return useSWR("/api/now-playing", fetcher, ops);
}

export default function NowPlaying() {
  const { data, error } = useAlbum();
  const { albumImageUrl, title, isPodcast, isPlaying } = data || {};

  if (error) return <p>error</p>;
  if (!data) return <p>loading...</p>;
  if (isPodcast) return <p>Podcast playing</p>;
  if (!isPlaying) return <p>Nowt Playing</p>;

  return <Image src={albumImageUrl} alt={title} layout="fill" />;
}
