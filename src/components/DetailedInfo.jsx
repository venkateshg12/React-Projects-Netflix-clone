import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeTypeId } from '../utils/slice/TypeIdSlice';
import useUpdateMovieDetails from '../hooks/useUpdateMovieDetails';
import MovieDetails from './MovieDetails';
import { Spinner } from '../utils/constant';
import { Home } from 'lucide-react';
import { resetMovieData } from '../utils/slice/detailInfoSlice';
import CreditDetails from './CreditDetails';

const DetailedInfo = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const type = useSelector(store => store?.typeId?.type);
    const id = useSelector(store => store?.typeId?.id);
    const store = useSelector(store => store?.typeId?.page);

    useUpdateMovieDetails();
    if (!type || !id) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    const handleClick = () => {
        dispatch(removeTypeId());
        dispatch(resetMovieData());
        navigate(`${store}`);
    }

    return (
        <div >
            <div className='p-5'>
                <button className="absolute flex items-center justify-center px-3 py-1 rounded-lg hover:border-2 hover:border-white scale-[1.07]  hover:white cursor-pointer bg-red-500 gap-2 font-bold" onClick={handleClick} >
                    <Home />
                    Home
                </button>
            </div>
            <div className='relative '>
                <MovieDetails />
                <CreditDetails />
            </div>
        </div>
    )
}

export default DetailedInfo;