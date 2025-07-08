import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import MovieList from "@/components/MovieList";
import { getSession, signOut } from "next-auth/react";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const {data:favorites=[]}=useFavorites()
  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Favorites " data={favorites}></MovieList>
      </div>
      {/* <div className="">
        <MovieList title="Favorites" data={movies} />
      </div> */}

      {/* <h1 className="text-4xl text-green-300">NetFlix</h1>
      <p className="text-white">Logged in as:{user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={()=>signOut()}>LogOut</button> */}
    </>
  );
}
