import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard';
import { Greater, LeftButton, RightButton } from '../utils/constant';
import { ChevronLeft, ChevronRight } from "lucide-react";
import useHorizontalScroll from '../hooks/useHorizontalScroll';

const MovieList = ({ title, movies, type }) => {
    const { scrollRef, canScrollLeft, canScrollRight, scroll } = useHorizontalScroll();

    return (
        <div className="w-full mt-[5] relative">
            <h1 className=" flex items-center md:text-4xl text-xl font-code font-bold pl-[1.6rem] mt-10 ">{title}
                <ChevronRight size={50} className='relative  scale-55 top-[0.17rem] md:top-1 -ml-[0.7rem] md:-ml-[0rem] md:scale-100 ' />
            </h1>
            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                    className="absolute z-50 cursor-pointer left-1 h-[13rem] md:h-[16rem] rounded-2xl  bg-black/50 backdrop-blur-md hover:scale-[1.07] top-[5.3rem] shadow-amber-20 border md:top-[5.7rem] shadow-none transition-all duration-500 ease-in-out  hover:shadow-md hover:shadow-amber-700"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft size={27} />
                </button>
            )}
            <div ref={scrollRef} className="pl-5 flex relative w-full overflow-x-auto smooth-scroll gap-5">
                {movies.map((movie) => (
                    <MovieCard movie={movie} type={type} />
                ))}
            </div>


            {/* Right Scroll Button */}
            {canScrollRight && (
                <button
                    className="absolute z-50 cursor-pointer right-1 h-[13rem] md:h-[16rem] rounded-2xl  bg-black/50 backdrop-blur-md hover:scale-[1.07] top-[5.3rem] shadow-amber-20 border md:top-[6.5rem] transition-all duration-500 ease-in-out  hover:shadow-md hover:shadow-amber-700"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight size={27}  />
                </button>
            )}
        </div>
    )
}
export default MovieList; 