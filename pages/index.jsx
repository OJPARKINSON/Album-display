/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from "swr";
import Image from "next/image";
import { spotifyFetch, getTweets } from "../lib";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const app = ({ tweets }) => {
  let refreshInterval = 4500;
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, spotifyFetch, {
    refreshInterval,
    refreshWhenHidden: true,
  });

  if (error) {
    console.log(error);
    return <h2>Error</h2>;
  }

  switch (data?.currently_playing_type) {
    case "episode":
      return <p>Podcast Playing</p>;
    case "track":
      refreshInterval = 4000;
      const { images, name } = data?.item.album;
      const { url } = images[0];
      return <Image src={url} alt={name} layout="fill" />;
    default:
      refreshInterval = 10000;
      return tweets.map(({ media, url, text }) => (
        <Image key={media} src={url} alt={text} />
      ));
  }
};

export default app;

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
