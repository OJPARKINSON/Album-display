import React from "react";
import useSWR from "swr";
import Image from "next/image";

import { spotifyFetch } from "../lib";

const NOW_PLAYING_URL = `https://api.spotify.com/v1/me/player/currently-playing`;

const App = () => {
  let refreshInterval = 4500;
  const SWROpts = {
    refreshInterval,
    refreshWhenHidden: true,
  };
  const { data, error } = useSWR(NOW_PLAYING_URL, spotifyFetch, SWROpts);

  if (error) {
    console.log(error);
    return <h2>Error</h2>;
  }
  console.log(data);

  switch (data?.currently_playing_type) {
    case "track":
      return (
        <Image
          src={data?.item?.album?.images[0].url}
          blurDataURL={data?.item?.album?.images[2].url}
          alt={data?.item?.album?.name}
          placeholder="blur"
          layout="fill"
        />
      );
    case "episode":
      return <p>Podcast Playing</p>;
    default:
      return <p>Nothing is playing</p>;
  }
};

export default App;
