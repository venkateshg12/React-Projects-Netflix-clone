import { useEffect, useState } from 'react';
import Initial from './Initial';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import usePopularSeries from '../hooks/usePopularSeries';
import useTopRated from '../hooks/useTopRated';
import useTopRatedSeries from '../hooks/useTopRatedSeries';
import useUpcomingSeries from '../hooks/useUpcomingSeries';
import useUpcoming from '../hooks/useUpcoming';
import { Spinner } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { resetMovieData } from '../utils/slice/detailInfoSlice';
import { addPage, removeTypeId } from '../utils/slice/TypeIdSlice';
import { removeInfo, removeInfoState } from '../utils/slice/gptSlice';


const Browse = () => {
    const dispatch = useDispatch();
    
    const { data: nowPlayingMovies, isLoading: loadingNowPlaying } = useNowPlayingMovies();
    const { data: topRatedMovies, isLoading: loadingTopRated } = useTopRated();
    const { data: topRatedSeries, isLoading: loadingTopRatedSeries } = useTopRatedSeries();
    const { data: popularMovies, isLoading: loadingPopularMovies } = usePopularMovies();
    const { data: popularSeries, isLoading: loadingPopularSeries } = usePopularSeries();
    const { data: upcomingMovies, isLoading: loadingUpcomingMovies } = useUpcoming();
    const { data: upcomingSeries, isLoading: loadingUpcomingSeries } = useUpcomingSeries();

    useEffect(() => {
        dispatch(resetMovieData());
        dispatch(removeTypeId());
        dispatch(removeInfo());
        dispatch(removeInfoState());
        dispatch(addPage("/browse"));
    }, [])

    const isLoading =
        loadingNowPlaying ||
        loadingPopularMovies ||
        loadingTopRated ||
        loadingPopularSeries ||
        loadingUpcomingSeries ||
        loadingUpcomingMovies ||
        loadingTopRatedSeries;


    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen '>
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Initial />
            <MainContainer nowPlayingMovies={nowPlayingMovies} />
            <SecondaryContainer
                nowPlayingMovies={nowPlayingMovies}
                popularMovies={popularMovies}
                topRatedMovies={topRatedMovies}
                upcomingMovies={upcomingMovies}
                popularSeries={popularSeries}
                upcomingSeries={upcomingSeries}
                topRatedSeries={topRatedSeries}
            />
        </>
    )
}
export default Browse;   