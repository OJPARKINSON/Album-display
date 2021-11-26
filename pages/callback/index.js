import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSpotifyAPI } from "../../components/hooks/useSpotifyAPI";
import { useRouter } from "next/router";

const Callback = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { getToken, user } = useSpotifyAPI();

  useEffect(() => {
    const { code } = router.query;
    console.log({ code });
    getToken(code);
    console.log({ user });
  }, [router.query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    console.log({ user });
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div>
      <h1>Autenticando...</h1>
      {ready && (
        <div>
          <p>
            Caso não seja redirecionado automaticamente,{" "}
            <Link href="/">
              <a>clique aqui!</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { code } = query;

  return {
    props: { code },
  };
}

export default Callback;
