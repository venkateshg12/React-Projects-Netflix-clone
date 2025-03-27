import play from "../assets/play.png"
import info from "../assets/info.svg"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addId, addType } from "./slice/TypeIdSlice";
import netflix_logo from "../assets/Netflix_Logo.png";
export const WhatButton = () => {
    return (
        <>
            <Link to="/gptSearch">
                <button className="hidden md:block bg-blue-500 z-50 px-2 py-1 text-[0.8rem] md:text-[1rem] rounded-md hover:border hover:border-white mr-5 hover:scale-[1.09]  cursor-pointer">what to watch ?</button>
            </Link>

        </>
    )
}

export const FindButton = () => {
    return (
        <>
            <Link to="/findmovie">
                <button className="hidden md:block z-10 bg-red-500 px-2 py-1 text-[0.8rem] md:text-[1rem] rounded-md hover:border hover:border-white mr-5 hover:scale-[1.09]  cursor-pointer">Find a movie</button>
            </Link>
        </>
    )
}
export const BackHome = () => {
    return (
        <>
            <Link to="/browse">
                <button className="hidden z-10 md:block bg-red-500 px-2 py-1 text-[0.8rem] md:text-[1rem] rounded-md hover:border hover:border-white mr-5 hover:scale-[1.09]  cursor-pointer">Back to Home</button>
            </Link>
        </>
    )
}

export const Netflix_Logo = () => {
    return (
        <>
            <Link to="/">
                <figure className="z-10">
                    <img
                        src={netflix_logo}
                        alt="Netflix"
                        className="h-[3rem] md:h-[5rem] md:w-[10rem] w-[7rem] cursor-pointer block"
                    />
                </figure>
            </Link>
        </>
    )
}

export const ValidateEmailPassword = ({ email, password }) => {
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-;]+\.[a-zA-Z]{2,}$/.test(email);
    const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isEmail) return "Email";
    if (!isPassword) return "Password";
    return null;
}

const api_key = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`,
    }
};

export const PlayInfo = ({ className, type, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addType(type));
        dispatch(addId(id));
        navigate(`/${id}`);
    }
    return (
        <>
            <div className={`${className} || '' `}>
                <div className='flex gap-3'>
                    <button className="flex bg-white text-black px-7  py-1 cursor-pointer hover:scale-[1.1] items-center gap-1 rounded-[0.4rem]">
                        <figure>
                            <img src={play} alt="Play Button" width={20} />
                        </figure>
                        <span className="text-xl">Play</span>
                    </button>
                    <button className="flex items-center hover:bg-neutral-400 cursor-pointer bg-neutral-600 hover:scale-[1.1] px-7 py-1 rounded-[0.4rem] gap-1" onClick={handleClick} >
                        <figure>
                            <img src={info} alt="info" width={23} />
                        </figure>
                        <span className="text-xl">Info</span>

                    </button>
                </div>
            </div>
        </>
    )
}


export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export const RightButton = () => {
    return (
        <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white z-10"
            onClick={() => scroll('right')}
        >
            {">"}
        </button>
    )
}

export const LeftButton = () => {
    return (
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white z-10"
            onClick={() => scroll('left')}
        >
            {"<"}
        </button >
    )
}

export const Greater = () => (
    <svg fill="#fff" className="w-[20px] h-[20px] md:w-[37px] md:h-[37px]" viewBox="0 -5 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 13.8320 43.5625 C 14.4883 43.5625 14.9336 43.3516 15.4258 43.1172 L 41.7695 31.2813 C 43.1055 30.6484 44.1602 29.6172 44.1602 28.1172 C 44.1602 26.6406 43.1289 25.5625 41.7461 24.9532 L 15.4258 12.8359 C 14.9570 12.6016 14.5351 12.4375 13.9258 12.4375 C 12.7070 12.4375 11.8398 13.2813 11.8398 14.5235 C 11.8398 15.6016 12.4023 16.2110 13.3867 16.6797 L 38.6055 27.8125 L 38.6055 28.0703 L 13.3867 39.2969 C 12.4023 39.7656 11.8398 40.3750 11.8398 41.4531 C 11.8398 42.7422 12.6836 43.5625 13.8320 43.5625 Z" /></svg>
)

export const Spinner = () => (
    <div role="status" >
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600  dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        {/* <span class="sr-only">Loading...</span> */}
    </div>
)

export const Home = () => {
    <div>
        <svg width="25px" height="25px" fill="#fff" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" id="home">
            <path d="M2,13.7478c0,0.13807,0.11193,0.25,0.25,0.25h3.749v-3h3v3h3.749c0.13807,0,0.25-0.11193,0.25-0.25V7.9987H2&#xA;&#x9;C2,7.9987,2,13.7478,2,13.7478z M13.93,6.5778l-0.9319-0.8189V2c0-0.55228-0.44771-1-1-1s-1,0.44772-1,1v2L7.6808,1.09&#xA;&#x9;C7.5863,0.9897,7.42846,0.98478,7.3279,1.079L7.3169,1.09L1.0678,6.553C0.9734,6.65376,0.97856,6.81197,1.07932,6.90637&#xA;&#x9;C1.12478,6.94896,1.18451,6.97304,1.2468,6.9739L3,6.9989h10.7468c0.13807,0.00046,0.25037-0.1111,0.25083-0.24917&#xA;&#x9;C13.99784,6.68592,13.97365,6.62445,13.93,6.5779V6.5778z" />
        </svg>
    </div>
}

export const CircularProgress = ({ percentage, className }) => {
    const [progress, setProgress] = useState(0);
    const radius = 40; // Radius of the circle
    const strokeWidth = 4; // Circle thickness
    const circumference = 2 * Math.PI * radius; // Full circle circumference
    const offset = circumference - (progress / 100) * circumference; // Calculate offset for progress

    // Gradient ID based on progress
    const gradientId = "progressGradient";

    // Get color based on percentage
    const getColor = () => {
        if (progress < 50) return ["#ff0000", "#ff7b00"]; // Red -> Orange glow
        if (progress < 75) return ["#ff9900", "#ffcc00"]; // Orange -> Yellow glow
        return ["#00ff00", "#33ff77"]; // Green -> Light Green glow
    };

    useEffect(() => {
        const animation = setTimeout(() => {
            setProgress(percentage);
        }, 500);
        return () => clearTimeout(animation);
    }, [percentage]);

    return (
        <div className={`${className || ''} 1relative w-[150px] h-[150px]  flex items-center justify-center`}>
            {/* SVG Circle */}
            <svg width="150" height="150">
                {/* Background Circle */}
                <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="#222"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />

                {/* Glow Filter */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="coloredBlur" />
                        </feMerge>
                    </filter>

                    {/* Gradient Stroke */}
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={getColor()[0]} />
                        <stop offset="100%" stopColor={getColor()[1]} />
                    </linearGradient>
                </defs>

                {/* Animated Progress Circle */}
                <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke={`url(#${gradientId})`} // Apply gradient
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 75 75)" // Start from top
                    style={{
                        transition: "stroke-dashoffset 1.5s ease-in-out",
                        filter: "url(#glow)", // Apply glowing effect
                    }}
                />
            </svg>

            {/* Percentage in Center */}
            <span
                className="absolute text-lg font-bold"
                style={{
                    color: getColor()[1], // Inner text matches glow color
                    textShadow: `0 0 10px ${getColor()[1]}`,
                }}
            >
                {progress}%
            </span>
        </div>
    );
};


export const AnimatedNumber = ({ targetNumber }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in ms
        const stepTime = 10; // Update interval
        const steps = duration / stepTime;
        const increment = targetNumber / steps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
                setCurrentNumber(targetNumber.toFixed(1)); // Ensures rounding
                clearInterval(interval);
            } else {
                setCurrentNumber(start.toFixed(1)); // Rounds to 1 decimal place
            }
        }, stepTime);

        return () => clearInterval(interval);
    }, [targetNumber]);

    return (
        <h1 className="text-xl font-bold text-white">
            {currentNumber}%
        </h1>
    );
};

export const ScrollButtons = ({ refElement, scrollState }) => {
    const handleScroll = (direction) => {
        if (!refElement.current) return;
        const scrollAmount = refElement.current.clientWidth * 0.8; // 80% of the visible width
        if (direction === "left") {
            refElement.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            refElement.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Left Button */}
            {scrollState.left && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 text-2xl rounded-full z-50"
                    onClick={() => handleScroll("left")}
                >
                    {"<"}
                </button>
            )}

            {/* Right Button */}
            {scrollState.right && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer bg-gray-800 text-white p-4 text-2xl rounded-full z-50"
                    onClick={() => handleScroll("right")}
                >
                    {">"}
                </button>
            )}
        </>
    );
};

export const ToggleButton = ({ isOn, setIsOn }) => {

    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={`px-5 py-3 cursor-pointer text-lg tracking-wider font-code font-bold rounded-lg text-white ${isOn ? "bg-green-500" : "bg-gray-500"
                }`}
        >
            {isOn ? "movie" : "show"}
        </button>
    );
};

export const LeftSide = ({ onClick }) => {
    return (
        <>
            <button className='absolute z-50 top-[35%] text-2xl left-5 bg-violet-500 p-2 hover:scale-[1.03] h-[8rem] rounded-2xl cursor-pointer transition-all transform scale-100 active:scale-95 ' onClick={onClick}>
                {"<"}
            </button>
        </>
    )
}
export const RightSide = ({ onClick }) => {
    return (
        <>
            <button className='absolute z-50 top-[35%] text-2xl right-2 bg-violet-500 p-2 hover:scale-[1.03] h-[8rem] rounded-2xl cursor-pointer transition-all transform scale-100 active:scale-95 ' onClick={onClick}>
                {">"}
            </button>
        </>
    )
}

export const AniLoader = () => {
    return (
        <>
            <div className="relative z-50 w-[8rem] h-[8rem] left-1/2 -translate-x-1/2 mt-[2rem]">
                <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="2s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite" />
                    </path>
                    <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="1s"
                            from="0 50 50"
                            to="-360 50 50"
                            repeatCount="indefinite" />
                    </path>
                    <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="2s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite" />
                    </path>
                </svg>
            </div>
        </>
    )
}
