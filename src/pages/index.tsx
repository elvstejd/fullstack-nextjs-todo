import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      {JSON.stringify(session)}
      <button onClick={() => signOut()}>cerrar sesion</button>
    </>
  );
};

export default Home;
