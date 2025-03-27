import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlayInfo } from '../utils/constant';
import no_poster from "../assets/no-movie.png"
import { IMAGE_BASE_URL } from '../utils/constant';
import VideoTitle from './VideoTitle';
import MenuSvg from '../utils/MenuSvg';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';

const MobileBrowsePage = ({ nowPlayingMovies }) => {
    const movies = nowPlayingMovies[0];
    const { backdrop_path, poster_path, id, original_title, overview } = movies;
    const [openNavigation, setOpenNavigation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true });
            dispatch(removeTrailerVideo());

        }).catch((error) => {
            // An error happened.
        });
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
            <div className='relative w-full h-[90vh] max-[650px]:h-[80vh]'>
                <div className="absolute inset-0 h-full bg-gradient-to-l z-20 from-black/70 to-transparent" />
                <div className='inset-0 backdrop-blur-md w-full h-full absolute z-10' />
                <figure className='absolute w-full h-full z-0'>
                    <img src={`${IMAGE_BASE_URL}${backdrop_path}`} alt="backgroundImage" className='w-full  h-full object-cover absolute' width={335} height={735} />
                </figure>
                <div className='flex flex-col items-center justify-center h-full'>
                    <figure className='relative text-center z-10 m-5'>
                        <img src={`${IMAGE_BASE_URL}${poster_path}`} alt="Poster Image" className='rounded-2xl' width={425} height={325} />
                    </figure>
                    <PlayInfo className="z-30 relative -mt-[2.5rem]" type="movie" id={id} />
                </div>
                <button className="absolute md:hidden top-4 right-2 z-50 p-2 scale-[1.03] mr-2 rounded-md border-2 border-white" onClick={toggleNavigation}>
                    <MenuSvg openNavigation={openNavigation} />
                </button>
                {openNavigation && (
                    <>
                        <div className='absolute w-full h-full backdrop-blur-xl font-sora  top-0 z-40'>
                            <div className='flex items-center flex-col gap-7  mt-[10rem]  h-full'>
                                <a href="/gptSearch" className="link">What to watch</a>
                                <a href="/findmovie" className="link">Find a movie/series</a>
                                <a onClick={handleSignOut} className="link">Sign out</a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default MobileBrowsePage;