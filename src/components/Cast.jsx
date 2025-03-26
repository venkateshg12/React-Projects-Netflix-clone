import React from 'react'
import { IMAGE_BASE_URL } from '../utils/constant';
import no_image from "../assets/no-profile.png"

const Cast = ({ cast }) => {
    const { profile_path, name, original_name, character } = cast;
    return (
        <div>
            <div className='relative h-full'>
                <div className='border-3 p-3 border-violet-900 items-center text-center cursor-pointer  flex flex-col  space-y-1 w-[12rem] min-[1000px]:min-w-[13rem] rounded-2xl h-full'>
                    <figure className='max-w-[12rem]'>
                        <img src={`${IMAGE_BASE_URL}${profile_path}`} alt="profile image" className='block rounded-full aspect-square w-[8rem] h-[8rem] min-[1000px]:min-w-[10rem] min-[1000px]:h-[10rem] scale-y-[1.04] ' width={325} height={55} onError={(e) => e.currentTarget.src = no_image} />
                    </figure>
                    <h1 className='block font-smooch md:text-2xl min-[1000px]:text-2xl text-[1.2rem] tracking-wide '>{name || original_name}</h1>
                    <h2>{character && "as"} &nbsp; <span className='text-gray-400 min-[1000px]:text-lg text-[0.8rem] text-wrap'>{character}</span></h2>
                </div>
            </div>
        </div>
    )
}

export default Cast;