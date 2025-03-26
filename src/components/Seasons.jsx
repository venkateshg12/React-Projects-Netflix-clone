import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner } from '../utils/constant';
import SeasonCard from './SeasonCard';

const Seasons = () => {
    const seasons = useSelector(store => store?.details?.contentDetails?.seasons);
    let filteredSeasons;
    if (seasons.length > 1 && (seasons[0].name === "Season 0" || seasons[0].name === "Specials")) {
        filteredSeasons = seasons.slice(1);
    } else {
        filteredSeasons = seasons;
    }
    // console.log(seasons[0]);

    if (!seasons) {
        return <Spinner />
    }
    return (
        <div className='relative pt-4 px-2  pb-[3rem] bg-[#010827] min-h-[12rem]'>
            <h1 className='mx-auto align font-bold text-3xl' >Seasons</h1>
            {
                filteredSeasons.map(season => <SeasonCard key={season.id} season={season} />)
            }
        </div>
    )
}

export default Seasons;


