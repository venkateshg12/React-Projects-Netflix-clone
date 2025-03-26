import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner } from '../utils/constant';
import GptSeriesDetails from './GptSeriesDetails';
import GptMoviesDetails from './GptMoviesDetails';

const GptInfo = () => {
    const details = useSelector(store => store?.info?.showInfo);
    const movies = useSelector(store => store?.info?.moviesInfo);
    const series = useSelector(store => store?.info?.seriesInfo);

    if(!details) {
        return <Spinner/>
    }

    return (
        <div className='relative bg-[#010827] z-50'>
            {!series && <GptMoviesDetails />}

            {!movies && <GptSeriesDetails />}
            {movies && series && (
                <>
                    <GptMoviesDetails />
                    <div className="w-full h-[0.1rem] bg-violet-900" />
                    <GptSeriesDetails />
                </>
            )}
        </div>
    )
}
export default GptInfo;