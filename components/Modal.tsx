import MuiModal from "@mui/material/Modal";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import { Box, Typography } from "@mui/material";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Movie, Element, Genre } from "../typings";
import { FaPlay } from "react-icons/fa";

function Modal() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#121212",
    border: "2px solid #121212",
    boxShadow: 24,
    p: 4,
  };
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [muted, setMuted] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, []);

  function handleClose() {
    setShowModal(false);
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fex !top-7 left-0 mx-auto w-full max-w-5xl overflow-hidden 
      overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
           bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}` || 'https://www.youtube.com/watch?v=AjWfY7SnMBI'}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white
             text-black px-8 text-xl font-bold transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton">
              {muted ? (
                <SpeakerXMarkIcon
                  className="h-6 w-6"
                  onClick={() => setMuted(!muted)}
                />
              ) : (
                <SpeakerWaveIcon
                  className="h-6 w-6"
                  onClick={() => setMuted(!muted)}
                />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div
                className="flex h-4 items-center justify-center rounded border 
              border-white/40 px-1.5 text-xs"
              >
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>

              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                    <span className="text-[gray]">Original Language: </span>
                    {movie?.original_language}
                </div>
                <div>
                    <span className="text-[gray]">Total Votes: </span>
                    {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
