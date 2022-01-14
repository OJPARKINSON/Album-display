import Image from "next/image";
import useSWR from "swr";
import fetcher from "lib/fetcher";

export default function NowPlaying() {
  const ops = { refreshInterval: 4000 }; // 4 seconds
  const { data, error } = useSWR("/api/now-playing", fetcher, ops);
  const { albumImageUrl, artist, title, isPodcast, isPlaying } = data || {};

  if (error) return <p>error</p>;
  if (!data) return <p>loading...</p>;
  if (isPodcast) return <p>Podcast playing</p>;
  if (!isPlaying) return <p>Nowt Playing</p>;

  const style = {
    backgroundImage: `url(${albumImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={style}>
      <div className="backdrop-blur-xl m-0 p-0 w-screen h-screen flex items-center justify-center text-center ">
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
      </div>
    </div>
  );
}
