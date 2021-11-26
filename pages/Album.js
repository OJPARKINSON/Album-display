import React, { useEffect } from "react";

import { useSpotifyAPI } from "../components/hooks/useSpotifyAPI";

const SpotifyWidget = ({ cover, music, artist }) => (
  <div className={className}>
    <img src={cover} />
    <div>
      <h3>{music}</h3>
      <h3>{artist}</h3>
    </div>
  </div>
);

const Current = () => {
  const { user, songData, getCurrentPlayingSong } =
    useSpotifyAPI("11132697178");

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPlayingSong();
    }, 6000);
    return () => clearInterval(interval);
  }, [user]);
  console.log({ songData });
  return (
    <div>
      {songData?.is_playing ? (
        <SpotifyWidget
          music={songData?.item?.name}
          artist={songData?.item?.artists?.map((a) => a.name).join(", ")}
          cover={songData?.item?.album?.images[0]?.url}
        />
      ) : (
        <h1>Nowt playing</h1>
      )}
    </div>
  );
};

export default React.memo(Current);
