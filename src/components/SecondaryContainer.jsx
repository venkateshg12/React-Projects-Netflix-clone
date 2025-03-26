import React from 'react'
import MovieList from './MovieList';

const SecondaryContainer = ({ nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, popularSeries, upcomingSeries, topRatedSeries }) => {
  
  return (
    <div className="mb-20">
      <div className="lg:-mt-[12rem] mt-[0]">
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} type="movie" />
      </div>
      <MovieList title={"Top Rated"} movies={topRatedMovies} type="movie" />
      <MovieList title={"Top Rated Series"} movies={topRatedSeries} type="tv" />
      <MovieList title={"Popular"} movies={popularMovies} type="movie" />
      <MovieList title={"Popular Series"} movies={popularSeries} type="tv" />
      <MovieList title={"Upcoming"} movies={upcomingMovies} type="movie" />
      <MovieList title={"Upcoming Series"} movies={upcomingSeries} type="tv" />
    </div>
  )
}
export default SecondaryContainer;