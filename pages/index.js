import { useLastFM } from "use-last-fm";
import { getTweets } from "lib/twitter";
import useSWR from "swr";
import fetcher from "lib/fetcher";

const clientID = process.env.LASTFM_CLIENT_ID;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export default function index({ tweets }) {
  const { status, song } = useLastFM("OJPARKINSON", clientID, 4000);
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, fetcher, {
    refreshInterval: 4500,
    refreshWhenHidden: true,
  });

  console.log({ song, data, error });

  if (status === "error") return <p>error</p>;
  if (status === "idle") {
    return tweets.map(({ media, url }) => <img key={media} src={url} />);
  }

  const bonkArt = song?.art.replace("300x300", "1500x1500");

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {status === "playing" && (
        <img
          src={bonkArt}
          alt={song?.name}
          style={{ height: "300px", width: "300px" }}
        />
      )}
      {data?.item.album.images[0].url && (
        <img
          src={data.item.album.images[0].url}
          alt={data.item.album.name}
          style={{ height: "300px", width: "300px" }}
        />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
