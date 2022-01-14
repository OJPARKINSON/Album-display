import { useState } from "react";

import NowPlaying from "../components/NowPlaying";
import { getTweets } from "lib/twitter";

export default function Index({ tweets }) {
  const [palette, setPalette] = useState({});
  const { LightVibrant } = palette;

  console.log(tweets);
  return (
    <>
      <div
        style={{ backgroundColor: LightVibrant?.hex && LightVibrant?.hex }}
        className="m-0 p-0 w-screen h-screen flex items-center justify-center text-center"
      >
        <NowPlaying setPalette={setPalette} />
      </div>
      {tweets &&
        tweets.map((tweet) => <img key={tweet.media} src={tweet.url} />)}
    </>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets();

  return { props: { tweets } };
}
