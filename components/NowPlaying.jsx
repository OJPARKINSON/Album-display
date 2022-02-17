import Image from "next/image";
import { useLastFM } from "use-last-fm";

const clientID = process.env.LASTFM_CLIENT_ID;

export default function NowPlaying() {
  const { status, song } = useLastFM("OJPARKINSON", clientID, 4000);

  console.log(song);

  if (status === "idle") return <p>Nowt Playing</p>;
  if (status === "error") return <p>error</p>;
  if (song?.art == null) return <p>loading...</p>;

  const bonkArt = song?.art.replace("300x300", "1500x1500");

  return <Image src={bonkArt} alt={song?.name} layout="fill" quality={100} />;
}
