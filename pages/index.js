import NowPlaying from "components/NowPlaying";
import { getTweets } from "../lib/twitter";


export default ({ tweets }) => {
 return (
  <div>
    <NowPlaying />
  </div>
)};


/* {tweets.map(({ media, url }) => (
<img key={media} src={url} />
))} */
// export async function getStaticProps() {
//   const tweets = await getTweets();

//   return { props: { tweets } };
// }
