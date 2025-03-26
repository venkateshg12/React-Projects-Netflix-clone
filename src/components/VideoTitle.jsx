import React from 'react'
import play from "../assets/play.png"
import info from "../assets/info.svg"
import { PlayInfo } from '../utils/constant'


const VideoTitle = ({ title, overview, className }) => {
    return (
        <div>
            <div className={` ${className || "top-[35%] left-[2rem] max-w-[45rem]"} -mt-[5rem] absolute mb-10 w-full z-50 space-y-5`}>
                <h1 className="text-[2rem] lg:text-[3rem] font-pop font-bold">{title}</h1>
                <p className="text-xl font-sora ">{overview}</p>
                <PlayInfo />
            </div>
        </div>
    )
}

export default VideoTitle;