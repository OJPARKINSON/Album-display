import React from "react";
import useSWR from "swr";
import Image from "next/image";

import { spotifyFetch, getTweets } from "../lib";

const NOW_PLAYING_URL = `https://api.spotify.com/v1/me/player/currently-playing`;
const SWROpts = {
  refreshInterval: 4500,
  refreshWhenHidden: true,
};

const App = ({ tweets }) => {
  const { data, error } = useSWR(NOW_PLAYING_URL, spotifyFetch, SWROpts);

  if (error) {
    console.log(error);
    return <h2>Error</h2>;
  }

  switch (data?.currently_playing_type) {
    case "track":
      return (
        <div className="h-screen w-screen grid">
          <Image
            src={data.item.album.images[0].url}
            alt={data.item.album.name}
            layout="fill"
          />
        </div>
      );
    case "episode":
      return <p>Podcast Playing</p>;
    default:
      return tweets.map(({ media, url, text }) => (
        <Image key={media} src={url} alt={text} />
      ));
  }
};

export default App;

export async function getStaticProps() {
  const tweets = await getTweets();
  return { props: { tweets } };
}
