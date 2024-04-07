"use client";

import useSWR from "swr";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { spotifyFetch, NOW_PLAYING_ENDPOINT } from "../lib/spotify";
import { Suspense } from "react";

export default function test () {
  return (
  <Suspense>
    <AlbumDisplay />
  </Suspense>
)}

function AlbumDisplay() {
  const searchParams = useSearchParams();

  const { data, error } = useSWR(NOW_PLAYING_ENDPOINT, spotifyFetch, {
    refreshInterval: 4500,
    refreshWhenHidden: true,
  });

  if (error) {
    console.error(error);
    return <h2>Error</h2>;
  }

  if (!data) return null

  console.log(data)



  switch (data?.currently_playing_type) {
    case "track":
      console.log(data);
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
      return (
        <TrackDisplay
          fullscreen={searchParams.get("fullscreen")}
          url="https://i.scdn.co/image/ab67616d0000b2730389027010b78a5e7dce426b"
          name="foo fighters"
        />
      );
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
      <div className="w-screen h-screen grid grid-cols-1 grid-rows-1 items-center content-center">
        <div className="overflow-hidden relative w-full h-full inline-block -z-1 blur-md">
          <Image
            className="-z-1 h-full w-full"
            placeholder="blur"
            blurDataURL={url}
            layout="fill"
            alt={name}
            src={url}
          />
        </div>
        <div className="m-0 p-0 z-1 w-full h-full absolute grid justify-center">
          <Image
            src={url}
            alt={name}
            width={600}
            height={600}
            layout="fixed"
            placeholder="blur"
            blurDataURL={url}
            className="shadow-outline self-center"
          />
        </div>
      </div>
    );
  }
};
