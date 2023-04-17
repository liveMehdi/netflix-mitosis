import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { FaPlay } from "react-icons/fa";
import { Movie } from "../typings";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  function elipsesWriter() {
    const value = movie?.overview;
    let desc = "";
    if (value) {
      if (value.split(" ").length >= 40) {
        for (let i = 0; i < 40; i++) {
          if (i > 0) {
            desc += " " + value?.split(" ")[i];
          } else {
            desc += value?.split(" ")[i];
          }
        }
        desc += "...";
      } else {
        desc += value;
      }
    }

    return desc;
  }

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-full -z-10">
        <Image
          alt=""
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          className="nonny"
          fill
        />
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold text-shadow-md ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {elipsesWriter()}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setShowModal(true);
            setCurrentMovie(movie);
          }}
        >
          More Info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8 " />
        </button>
      </div>
    </div>
  );
}

export default Banner;
