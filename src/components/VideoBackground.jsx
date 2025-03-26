import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTrailerVideo } from '../hooks/useTrailerVideo';
import { gsap } from "gsap";

const VideoBackground = ({ id }) => {
    const textRef = useRef();

    // fetch the trailer Info and add it to the redux store.
    useTrailerVideo({ id });
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useEffect(() => {
        if (!trailerVideo) {
            gsap.to(textRef.current, {
                textShadow: "0px 0px 20px rgba(255,255,255,1)", // Brighter shadow
                repeat: -1,
                yoyo: true,
                duration: 1.6,
                ease: "power2.inOut",
            });
        }
    }, [trailerVideo]);

    if (!trailerVideo) {
        return (
            <>
                <div className='w-screen bg-[#0c072b] h-[70vh] flex items-center justify-center xl:h-[95vh] -z-50 '>
                    <div>
                        <h1 ref={textRef} className='relative font-bold text-violet-950 text-7xl font-pop font-lob '>No Video Available!</h1>
                    </div>

                </div>
            </>
        )
    }
    const { key } = trailerVideo;
    // console.log(trailerVideo);

    return (
        <div className="overflow-hidden h-full w-full -translate-y-[1rem] pointer-events-none">
            <div className="absolute inset-0 w-[40rem] bg-gradient-to-r opacity-[1] z-10 from-black/90 to-transparent" />
            <iframe
                className="aspect-video w-screen h-[70vh] xl:h-[95vh] -z-50  xl:scale-[1.9]"
                width="560"
                height="315"
                // src={`https://www.youtube.com/embed/${key}?pause=1`}
                src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&start=7`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
                <div className='absolute inset-0 w-full h-[86vh] bg-black/50' />
            </iframe>
        </div>
    )
}
export default VideoBackground;