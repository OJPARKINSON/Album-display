import Image from "next/image";
import { useLastFM } from "use-last-fm";
import { getTweets } from "lib/twitter";
import useSWR from "swr";
import fetcher from "lib/fetcher";

const clientID = process.env.LASTFM_CLIENT_ID;

export default function index({ tweets }) {
  const { status, song } = useLastFM("OJPARKINSON", clientID, 4000);
  const { data } = useSWR("/api/now-playing", fetcher, {
    refreshInterval: 4000,
    refreshWhenHidden: true,
  });

  console.log({ status, song, data });

  if (status === "error") return <p>error</p>;
  if (status === "idle") {
    return tweets.map(({ media, url }) => <img key={media} src={url} />);
  }

  const bonkArt = song?.art.replace("300x300", "1500x1500");

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {status === "playing" && (
        <Image src={bonkArt} alt={song?.name} layout="fill" />
      )}
      {data?.albumImageUrl && (
        <Image src={data.albumImageUrl} alt={data.album} layout="fill" />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
