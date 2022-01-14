import NowPlaying from "components/NowPlaying";
import {getTweets} from "../lib/twitter";

export default ({tweets}) => (
    <div
        className="m-0 p-0 w-screen h-screen flex items-center justify-center text-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <NowPlaying/>
        {tweets.map(({media, url}) => <img key={media} src={url}/>)}
    </div>
)


export async function getStaticProps() {
    const tweets = await getTweets();

    return {props: {tweets}};
}
