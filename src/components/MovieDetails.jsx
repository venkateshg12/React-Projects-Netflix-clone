import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_OPTIONS, CircularProgress, IMAGE_BASE_URL, Spinner } from '../utils/constant';
import dark_blue from "../assets/dark_blue.jpg"
import Seasons from './Seasons';
import useTrailerUrl from '../hooks/useTrailerUrl';


const fetchTrailer = async (id) => {
  if (!id) return null;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS);
  const json = await res.json();
  // console.log(json);
  let filterTrailerData = json.results.filter((video) => video.type === "Trailer");
  return filterTrailerData.length > 0 ? filterTrailerData[0] : json.results[0];
};

const MovieDetails = () => {
  const movieDetails = useSelector(store => store?.details?.contentDetails);
  const type = useSelector(store => store?.typeId?.type);
  const [trailer, setTrailer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  // console.log(movieDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getTrailer = async () => {
      if (movieDetails?.id) {
        const trailerData = await fetchTrailer(movieDetails?.id);
        setTrailer(trailerData);
      }
    };
    getTrailer();
  }, [movieDetails?.id]);


  if (!movieDetails || !type) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }
  const { id, backdrop_path, poster_path, title, original_title, name, original_name, release_date, first_air_date, genres, vote_average, overview, number_of_episodes, number_of_seasons, runtime, seasons } = movieDetails;



  const redirectTrailer = () => {
    if (!trailer || !trailer.key) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
  }





  const releases_date = release_date?.slice(0, 4);
  const firsts_air_date = first_air_date?.slice(0, 4);
  const genreNames = genres.map(genre => genre.name).join(',  ');
  const votes_average = vote_average.toFixed(1) * 10;

  return (
    <div>
      <div className='relative mt-5 md:mt-10 max-[1000px]:bg-[#010827]'>
        <figure className='z-0 absolute inset-0 opacity-[0.2] w-full h-full hidden min-[1000px]:block'>
          <img src={`${IMAGE_BASE_URL}${backdrop_path}`} alt="BackgroundImage" className='md:scale-[1] w-full h-[69vh] md:h-[85vh] object-cover object-top overflow-hidden' width={525} height={235} onError={((e) => e.currentTarget.src = dark_blue)} />
        </figure>
        <div>
          {showPopup && (
            <>
              <div className='flex justify-center items-center relative z-50'>
                <div className='text-center max-w-md rounded-2xl text-2xl md:top-[0%] top-[16%] font-cut font-bold text-red-700 bg-white p-5 flex justify-center absolute'>
                  <h1>No Trailer <br />Available!</h1>
                </div>
              </div>
            </>
          )}
          <div className='relative min-[1000px]:pl-[10rem] py-[8rem] p-[1rem] pt-[3rem] flex min-[1000px]:flex-row max-[1000px]:flex-col items-center min-h-[45rem] justify-center gap-4 mx-auto min-[1000px]:mx-0'>
            <div>
              <figure className='relative my-auto max-[1000px]:items-center flex justify-center md:mx-[1rem] px-auto'>
                <img src={`${IMAGE_BASE_URL}${poster_path}`} alt="MoviePoster" width={340} height={375} className=' relative rounded-xl max-h-[34rem] max-w-[21rem]' />
              </figure>
            </div>
            <div className="max-[1000px]:block hidden w-full h-[0.1rem] bg-violet-900" />
            <div className="-pl-[4rem] space-y-2 bg-[#010827] p-3 min-[1000px]:bg-transparent min-[1000px]:p-0 rounded-2xl">
              <div className='mt-[9vh] md:mt-[3vh]'>
                <div className='align flex'>
                  <h1 className="text-[2rem] md:text-[3rem] shad font-bebas">{type === "movie" ? (title || original_title) : (name || original_name)} {"("}{type === "movie" ? (releases_date) : (firsts_air_date)}{")"}</h1>
                </div>
                <div className="align" >
                  <div className='flex items-center justify-center min-[1000px]:justify-start '>
                    <CircularProgress percentage={votes_average} className="scale-[0.7] md:scale-[1]" />
                    <h4 className="flex flex-wrap font-bold font-pop text-[1.2rem]" ><span>{genreNames}</span></h4>
                  </div>
                </div>
                <div className='max-w-3xl text-[1.2rem] font-code font-semibold '>
                  <h2>{overview}</h2>
                </div>
                <div className=' font-sora font-extrabold mb-[2rem]'>
                  {type === "movie" ? (
                    <div className='align'>
                      <h3 className='pt-4 text-xl min-[1000px]:text-3xl' >{"Runtime: "}{runtime}{" "}{"min"}</h3>
                    </div>
                  ) : (
                    <>
                      <div className='pt-5 font-semibold text-xl text-center md:text-start'>
                        <h3>{"Total Seasons:"}&nbsp;&nbsp; {number_of_seasons}</h3>
                        <h3>{"Total Episodes: "}{number_of_episodes}</h3>
                      </div>
                    </>
                  )}
                  <div className='text-center md:text-start mt-4 hover:shadow'>
                    <button className='text-black bg-white px-5 py-2 active:shadow-[0_0_15px_rgba(255,255,255,0.8)] active:scale-[1.03] rounded-4xl text-center hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-[1.03]' onClick={redirectTrailer}>
                      Watch Trailer ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {type === "tv" && <Seasons />}
      <div className="w-full h-[0.1rem] bg-violet-900 " />
    </div>
  )
}
export default MovieDetails;