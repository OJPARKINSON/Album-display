import NowPlaying from "components/NowPlaying";
import { getTweets } from "../lib/twitter";
import { useLastFM } from "use-last-fm";

export default ({ tweets }) => {
  const lastFM = useLastFM('OJPARKINSON', process.env.LASTFM_CLIENT_ID, 3000);

  console.log(lastFM);
  return (
    <div>
      <NowPlaying />
    </div>
  );
};

/* {tweets.map(({ media, url }) => (
<img key={media} src={url} />
))} */
// export async function getStaticProps() {
//   const tweets = await getTweets();

//   return { props: { tweets } };
// }
