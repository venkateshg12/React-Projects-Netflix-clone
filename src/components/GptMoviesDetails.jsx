import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner } from "../utils/constant";
import MovieCard from './MovieCard';
const GptMoviesDetails = () => {
  const store = useSelector(store => store?.info?.moviesInfo);
  const category = useSelector(store => store?.info?.movieCategory);

  if (!store) {
    return null;
  }

  return (
    <div>
      <div className='relative z-50  bg-[#010827] my-10 p-10 backdrop-blur-3xl'>
        <h1 className='text-xl pl-5 text-center md:text-start  pt-10 font-sora font-bold md:text-4xl pb-4'>{category}</h1>
        <div className='relative items-center place-items-center p-5  grid max-[1280px]:grid-cols-2 gap-4 min-[1280px]:grid-cols-4  max-[650px]:grid-cols-1 z-50 border-4 border-violet-950 rounded-2xl'>
          {store.map(store => (
            <div className='border-3 border-violet-700 p-4 md:p-9 rounded-2xl'>
              <MovieCard movie={store} type="movie" className="lg:h-[25rem] max-w-[25rem] md:w-auto max-[1270px]:h-[20rem] " />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GptMoviesDetails;