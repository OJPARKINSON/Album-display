import useSWR from "swr";
import { spotifyFetch, getTweets } from "../lib";
import Image from "next/image";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

export default ({ tweets }) => {
  let refreshInterval = 4500;
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, spotifyFetch, {
    refreshInterval,
    refreshWhenHidden: true,
  });

  if (data && !error) {
    const { images, name } = data?.item.album;
    const { url } = images[0];
    return <Image src={url} alt={name} layout="fill" />;
  } else {
    refreshInterval = 10000;
    return tweets.map(({ media, url, text }) => (
      <Image key={media} src={url} alt={text} />
    ));
  }
};

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
