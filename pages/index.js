import { getTweets } from "lib/twitter";
import useSWR from "swr";
import fetcher from "lib/fetcher";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export default function index({ tweets }) {
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, fetcher, {
    refreshInterval: 5000,
    refreshWhenHidden: true,
  });

  if (error !== undefined) return <p>error</p>;
  if (data === null) {
    return tweets.map(({ media, url }) => <img key={media} src={url} />);
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {data?.item.album.images[0].url && (
        <img
          src={data.item.album.images[0].url}
          alt={data.item.album.name}
          style={{ height: "100vh", width: "100vw" }}
        />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
