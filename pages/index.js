import Image from "next/image";
import NowPlaying from "components/NowPlaying";

export default () => (
    <div className="m-0 p-0 w-screen h-screen flex items-center justify-center text-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <NowPlaying />
    </div>
  );
