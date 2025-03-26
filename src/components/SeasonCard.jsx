import React from 'react'
import { AnimatedNumber, IMAGE_BASE_URL, Spinner } from '../utils/constant';
import no_poster from "../assets/no-movie.png"
import { useSelector } from 'react-redux';

const SeasonCard = ({ season }) => {
    // console.log(season)
    const alterOverview = useSelector(store => store?.details?.contentDetails?.overview);
    if (!season || !alterOverview) {
        return <Spinner />
    }
    const { air_date, episode_count, name, overview, season_number, poster_path, vote_average } = season;
    let release_date;
    if (air_date === null) {
        release_date = "";
    } else {
        release_date = air_date.slice(0, 4);
    }

    const rating = (vote_average.toFixed(1)) * 10;
    const seasonName = `Season ${season_number}`;

    return (
        <div>
            <div className='min-h-[5rem] md:ml-[2rem] p-2 mt-[1rem] text-xl  border-2 rounded-xl border-violet-950' >
                {seasonName === name ? (
                <h2 className="font-pop"><span className='font-cut text-xl md:text-2xl block text-center'>{name}</span></h2>

                ):(
                    <h2 className="font-pop">Season {season_number}&nbsp;<span className='font-cut text-xl md:text-2xl block text-center'>{name}</span></h2>
                ) }
                <div className='flex gap-3'>
                    <figure className='p-3 hidden md:block'>
                        <img src={`${IMAGE_BASE_URL}${poster_path}`} width={125} height={225} alt="Image" className='rounded-lg max-w-[12rem] ' onError={(e) => e.currentTarget.src = no_poster} />
                    </figure>
                    <div className="pt-5 font-sora">
                        <h1>{release_date}</h1>
                        <div className='flex items-center gap-3'>
                            <h3>episodes: {episode_count}</h3>
                            <h3><span className='flex'> rating: &nbsp;
                                {rating}%
                            </span></h3>
                        </div>
                        <h3 className='font-pop text-[0.9rem] py-3' >{overview || alterOverview}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeasonCard;