import useSWR from "swr";
import { fetcher } from "lib/spotify";
import { getTweets } from "lib/twitter";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export default function index({ tweets }) {
  let refreshInterval = 4500;
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, fetcher, {
    refreshInterval,
    refreshWhenHidden: true,
  });

  if (error !== undefined || data === null) {
    refreshInterval = 10000;
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
