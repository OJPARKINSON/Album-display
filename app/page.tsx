"use client";

import useSWR from "swr";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { spotifyFetch, NOW_PLAYING_ENDPOINT } from "../lib/spotify";

export default function AlbumDisplay() {
  const searchParams = useSearchParams();

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
        <TrackDisplay
          fullscreen={searchParams.get("fullscreen")}
          url={data?.item?.album?.images[0].url}
          name={data?.item?.album?.name}
        />
      );
    case "episode":
      return <p>A podcast playing</p>;
    default:
      return <p>Nothing is playing</p>;
  }
}

interface TrackDisplayType {
  fullscreen: null | string;
  url: string;
  name: string;
}

const TrackDisplay = ({ fullscreen, url, name }: TrackDisplayType) => {
  if (fullscreen != null) {
    return (
      <Image
        placeholder="blur"
        blurDataURL={url}
        layout="fill"
        alt={name}
        src={url}
      />
    );
  } else {
    return (
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <div className="backdrop-blur-xl m-0 p-0 w-screen h-screen flex items-center justify-center text-center">
          <Image
            src={url}
            alt={name}
            width={600}
            height={600}
            layout="fixed"
            className="block shadow-outline self-center"
          />
        </div>
      </div>
    );
  }
};
