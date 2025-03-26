import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import MobileBrowsePage from './MobileBrowsePage';


const MainContainer = ({ nowPlayingMovies }) => {
    const mainMovies = nowPlayingMovies[0];
    const { original_title, overview, id } = mainMovies;

    return (
        <div>
            <div className="absolute inset-0 h-[5rem] bg-gradient-to-b z-10 from-black/90 to-transparent" />
            <div className="min-[1026px]:block hidden">
                <VideoTitle title={original_title} overview={overview} />
                <VideoBackground id={id} />
            </div>
            <div className="min-[1026px]:hidden" >
                <MobileBrowsePage nowPlayingMovies={nowPlayingMovies} />

            </div>
        </div>
    )
}
export default MainContainer;
