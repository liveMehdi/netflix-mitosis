import { Movie } from "../typings";
import Image from "next/image";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";


interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transtion duration-200 
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        alt=""
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill sizes="300px"
        onClick={() => {
          setShowModal(true)
          setCurrentMovie(movie)
        }}
      />
    </div>
    
  );
}

export default Thumbnail;
