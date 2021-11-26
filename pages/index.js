import Link from "next/link";
import { API, graphqlOperation } from "aws-amplify";

import config from "../src/aws-exports";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  createTodoList,
} from "../src/graphql/mutations";
import { getTodoList } from "../src/graphql/queries";
import { useLocalStorage } from "../components/hooks/useLocalStorage";

API.configure(config);

const goToSpotifyLogin = () => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.BASE_URL}/callback&scope=${process.env.SCOPE}`;
};

const Index = () => {
  const [spotifyUser] = useLocalStorage("spotify_user");

  if (spotifyUser) {
    return (
      <div>
        <h1>Welcome to Album Display</h1>
        <Link href={"/album"}>
          <a>Login to Spotify</a>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome to Album Display</h1>
        <button onClick={goToSpotifyLogin}>
          <a>Login to Spotify</a>
        </button>
      </div>
    );
  }
};

export default Index;
