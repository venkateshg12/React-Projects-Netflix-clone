import React, { useEffect, useMemo, useState } from 'react'
import NetflixIntro from './NetflixIntro';
import { API_OPTIONS, BackHome, Netflix_Logo, ToggleButton, WhatButton } from '../utils/constant';
import cross from "../assets/cross.svg";
import { useDebounce } from "react-use"
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { addPage } from '../utils/slice/TypeIdSlice';
import MenuSvg from '../utils/MenuSvg';

const API_BASE_URL = 'https://api.themoviedb.org/3';


const MovieSearch = () => {
    const [isOn, setIsOn] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openNavigation, setOpenNavigation] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addPage("/findmovie"));
    }, [])


    // Debounce the search term
    useDebounce(() => setDebouncedSearchTerm(searchText), 300, [searchText]);
    const type = (isOn ? "movie" : "tv");
    const fetchMovies = async (query) => {
        if (!query) {
            setMovies([])
            return;
        }
        setLoading(true);
        const endpoint = query ? `${API_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/${type}?sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        if (data.results) {
            setMovies(data.results);
        } else {
            setMovies([]);
        }
    }
    
    // Trigger movie fetch when `debouncedSearchTerm` updates
    useDebounce(() => fetchMovies(debouncedSearchTerm), 300, [debouncedSearchTerm]);

    const clearInput = () => {
        setSearchText("");
        setLoading(false);
        setMovies([]);
    }

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(!openNavigation);
        } else {
            setOpenNavigation(!openNavigation);
        }
    }

    return (
        <div>
            <NetflixIntro />
            <div className='relative'>
                <div className='relative flex items-center z-40 justify-between px-5'>
                    <Netflix_Logo />
                    <div className='flex gap-4'>
                        <WhatButton />
                        <BackHome />
                    </div>
                </div>
                <button className="absolute md:hidden top-4 right-2 z-50 p-2 scale-[1.04] mr-2 rounded-md border-2 border-white" onClick={toggleNavigation}>
                    <MenuSvg openNavigation={openNavigation} />
                </button>
                {openNavigation && (
                    <>
                        <div className='absolute w-full h-full backdrop-blur-xl font-sora  top-0 z-45'>
                            <div className='flex items-center flex-col gap-7  mt-[10rem]  h-full'>
                                <a href="/gptSearch" className="link">What to watch</a>
                                <a href="/browse" className="link">Home</a>
                            </div>
                        </div>
                    </>
                )}
                <div className='relative flex items-center justify-center h-[40vh]'>
                    <div className="absolute  w-full max-w-2xl p-5 rounded-xl z-40 bg-gray-800 flex flex-col sm:flex-row gap-4 items-center shadow-lg">
                        <form className="w-full relative sm:flex-grow " onSubmit={(e) => e.preventDefault()}>
                            <div className='relative'>
                                <input
                                    type="text"
                                    className="w-full text-lg p-2 sm:p-3 border border-amber-50 rounded-xl bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                                    placeholder="Search a movie"
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={searchText}
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-3 md:top-4.5 hover:scale-[1.3] cursor-pointer'
                                    onClick={clearInput}
                                >
                                    <img src={cross} alt="cross" className='w-5 h-5' />
                                </button>
                            </div>
                        </form>

                        <div>
                            <ToggleButton isOn={isOn} setIsOn={setIsOn} />
                        </div>
                    </div>
                </div>
                {
                    loading &&
                    (
                        <div className='relative z-50 grid'>
                            <div className=" bg-[#010827] grid place-items-center py-5 md:p-5 max-[1280px]:grid-cols-2 gap-2 md:gap-4 min-[1280px]:grid-cols-4 rounded-2xl  md:border-2 md:border-violet-600 ">
                                {
                                    movies.length > 0 ? (
                                        movies.map(movie => (
                                            <div className='border-2 border-violet-700 rounded-2xl px-3 md:px-7 h-full flex items-center justify-center'>
                                                <MovieCard movie={movie} type={type} className="w-[9rem] md:w-[14rem] py-5 h-full" />
                                            </div>
                                        ))
                                    ) : ("")
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default MovieSearch;