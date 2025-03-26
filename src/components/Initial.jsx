import React, { useEffect, useState } from 'react'
import background_img from "../assets/background_img.jpg"
import netflix_logo from "../assets/Netflix_Logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/slice/userSlice';
import { useQueryClient } from '@tanstack/react-query';
import { removeTrailerVideo } from '../utils/slice/movieSlice';
import { FindButton, WhatButton } from '../utils/constant';
import { persistor } from '../utils/store/appStore';
import MenuSvg from '../utils/MenuSvg';

const Initial = () => {
    const store = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const queryClient = useQueryClient();
    const [openNavigation, setOpenNavigation] = useState(false);


    const handlegpt = () => {
        navigate("/gptSearch");
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true });
            dispatch(removeTrailerVideo());

        }).catch((error) => {
            // An error happened.
        });
    }
    const handleSignIn = () => {
        navigate("/login")
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                navigate("/browse");
                if (location.pathname === '/') {
                    navigate("/browse");
                }
            } else {
                // User is signed out
                dispatch(removeUser());
                persistor.purge();
                persistor.flush();
                queryClient.clear();
                if (location.pathname === '/browse') {
                    navigate("/");
                }
            }
        });
        // this will be called when component unmounts
        return () => unSubscribe();
    }, [])

 
    return (
        <div>
            {!store && (
                <>
                    <figure className="w-full h-screen">
                        <img src={background_img} alt="background_image" className="w-full md:h-screen h-[85vh] overflow-hidden" />
                        <div className="absolute inset-0 bg-black/70" />
                        <div className="absolute inset-0 h-[14vh] bg-gradient-to-b from-black/90 to-transparent" />
                    </figure>
                </>
            )}
            <div className="absolute top-0 left-0 right-0 md:px-7 px-3 pt-1 z-30">
                <div className="relative flex justify-between items-center  flex-wrap">
                    <Link to="/">
                        <img
                            src={netflix_logo}
                            alt="Netflix"
                            className="h-[3rem] md:h-[5rem] md:w-[10rem] w-[7rem] cursor-pointer block"
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        {store && (
                            <div className='flex gap-3'>
                                <WhatButton />
                                <FindButton />
                            </div>
                        )}
                        <div >
                            <button className="hidden cursor-pointer md:inline-block text-[0.8rem] md:text-[1rem] bg-red-500 px-3 py-1 rounded-sm font-bold hover:scale-[1.07]" onClick={store ? handleSignOut : handleSignIn} >
                                {store ? "Sign out" : "Sign in"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Initial;
