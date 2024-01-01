"use client";

import useSWR from "swr";
import Image from "next/image";

import { spotifyFetch, NOW_PLAYING_ENDPOINT } from "../lib/spotify";

const App = () => {
  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, spotifyFetch, {
    refreshInterval: 4500,
    refreshWhenHidden: true,
  });

  if (error) {
    console.error(error);
    return <h2>Error</h2>;
  }

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
      return <p>A podcast playing</p>;
    default:
      return <p>Nothing is playing</p>;
  }
};

export default App;
