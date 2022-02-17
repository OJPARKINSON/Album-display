import Image from "next/image";
import { useLastFM } from "use-last-fm";

const clientID = process.env.LASTFM_CLIENT_ID;

export default function NowPlaying() {
  const { status, song } = useLastFM("OJPARKINSON", clientID);

  if (status === "error") return <p>error</p>;
  if (!status) return <p>loading...</p>;

  if (status === "idle") return <p>Nowt Playing</p>;

  const bonkArt = song?.art.replace("300x300", "1500x1500");

  return <Image src={bonkArt} alt={song?.name} layout="fill" quality={100} />;
}
