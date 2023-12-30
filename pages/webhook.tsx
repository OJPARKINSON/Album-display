import Pusher from "pusher-js";
import { useState } from "react";
import Image from "next/image";

const WebHook = () => {
  const [message, setMessage] = useState<{ url?: string }>();
  const pusher = new Pusher("1971fe9418e861720cec", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data) {
    console.log(data, "JS");
    setMessage(data);
  });

  return (
    <div className="h-screen w-screen grid">
      {message?.url && (
        <Image
          src={message.url}
          blurDataURL={message.url}
          placeholder="blur"
          layout="fill"
          alt="bonk"
        />
      )}
    </div>
  );
};

export default WebHook;
