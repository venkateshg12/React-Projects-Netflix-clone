import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Cast from './Cast';
import Crew from './Crew';
import { LeftSide, RightSide } from '../utils/constant';

const CreditDetails = () => {
    const cast = useSelector(store => store?.details?.creditDetails?.cast);
    const crew = useSelector(store => store?.details?.creditDetails?.crew);

    const castScrollRef = useRef();
    const crewScrollRef = useRef();

    const [castScrollState, setCastScrollState] = useState({ left: false, right: true });
    const [crewScrollState, setCrewScrollState] = useState({ left: false, right: true });

    const scrollAmount = window.innerWidth * 0.80;

    const updateScrollState = (scrollRef, setScrollState) => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setScrollState({
                left: scrollLeft > 0,
                right: Math.ceil(scrollLeft + clientWidth) < scrollWidth,
            });
        }
    };


    const scrollLeft = (scrollRef, setScrollState) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            setTimeout(() => updateScrollState(scrollRef, setScrollState), 100); // Update after scrolling
        }
    };

    const scrollRight = (scrollRef, setScrollState) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            setTimeout(() => updateScrollState(scrollRef, setScrollState), 100); // Update after scrolling
        }
    };

    useEffect(() => {
        if (castScrollRef.current) {
            updateScrollState(castScrollRef, setCastScrollState);
            castScrollRef.current.addEventListener('scroll', () => updateScrollState(castScrollRef, setCastScrollState));
        }
        if (crewScrollRef.current) {
            updateScrollState(crewScrollRef, setCrewScrollState);
            crewScrollRef.current.addEventListener('scroll', () => updateScrollState(crewScrollRef, setCrewScrollState));
        }
        return () => {
            if (castScrollRef.current) {
                castScrollRef.current.removeEventListener('scroll', () => updateScrollState(castScrollRef, setCastScrollState));
            }
            if (crewScrollRef.current) {
                crewScrollRef.current.removeEventListener('scroll', () => updateScrollState(crewScrollRef, setCrewScrollState));
            }
        };
    }, []);

    if (!cast || !crew) {
        return null;
    }

    return (
        <div>
            <div className='relative bg-[#010827]'>
                {cast && cast.length > 0 &&
                    (
                        <>
                            <h1 className='heading'>Cast:</h1>
                            <div className='relative px-5 '>
                                <div className='hidden md:block'>
                                    {castScrollState.left && <LeftSide onClick={() => scrollLeft(castScrollRef, setCastScrollState)} />}
                                    {castScrollState.right && <RightSide onClick={() => scrollRight(castScrollRef, setCastScrollState)} />}
                                </div>
                                <div className='relative px-1 md:px-5 smooth-scroll overflow-x-scroll' ref={castScrollRef}>
                                    <div className='smooth-scroll content-scroll'>
                                        {cast.map((cas) =>
                                            <Cast cast={cas} key={cas.id} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className="relative h-[0.1rem] w-full bg-violet-900" />
                {crew && crew.length > 0 &&
                    (
                        <>
                            <h1 className='heading'>Crew:</h1>
                            <div className="relative px-1 md:px-5">
                                <div className='hidden md:block'>
                                    {crewScrollState.left && <LeftSide onClick={() => scrollLeft(crewScrollRef, setCrewScrollState)} />}
                                    {crewScrollState.right && <RightSide onClick={() => scrollRight(crewScrollRef, setCrewScrollState)} />}
                                </div>
                                <div className='relative px-5  smooth-scroll overflow-x-scroll' ref={crewScrollRef}>
                                    <div className='content-scroll smooth-scroll'>
                                        {crew.map((cre) =>
                                            <Crew crew={cre} key={cre.id} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="w-full h-[0.1rem] bg-violet-900" />
        </div>
    )
}
export default CreditDetails;



// const scrollLeft = (scrollRef) => {
//     if (scrollRef.current) {
//         scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     }

// };

// const scrollRight = (scrollRef) => {
//     if (scrollRef.current) {
//         scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
// };