import React from 'react'

const NetflixIntro = () => {
    return (
        <div>
            <div>
                <div className="absolute hidden md:block z-40 h-full object-cover overflow-hidden w-full -translate-y-[1rem] pointer-events-none">
                    <div className="absolute inset-0 w-[40rem] bg-gradient-to-r opacity-[1] z-10 from-black/90 to-transparent" />
                    <div className="absolute inset-0 w-full opacity-[0.7] z-10 bg-black" />
                    <iframe
                        className="aspect-video w-screen object-cover md:h-[95vh] -z-50  md:scale-[1.9]"
                        width="560"
                        height="315"
                        // src="https://www.youtube.com/embed/C7oXIxZvUGQ?si=y2LCfKNR7Q_9t3wh?pause=1"
                        src="https://www.youtube.com/embed/C7oXIxZvUGQ?si=y2LCfKNR7Q_9t3wh?&autoplay=1&mute=1&loop=1&playlist=C7oXIxZvUGQ&start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    )
}
export default NetflixIntro;