import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/slice/movieSlice';
import { useQuery } from '@tanstack/react-query';

const fetchTrailer = async (id) => {
    if (!id) return null;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS);
    const json = await res.json();
    let filterTrailerData = json.results.filter((video) => video.type === "Trailer");
    // console.log("filterdata" +filterTrailerData);
    return filterTrailerData.length > 0 ? filterTrailerData[0] : json.results[0];
};

export const useTrailerVideo = ({ id }) => {
    const dispatch = useDispatch();
    
    const { data: trailer, isLoading, error } = useQuery({
        queryKey: ["trailer", id],
        queryFn: () => fetchTrailer(id),
        staleTime: 1000 * 60 * 5, // Cache trailer for 5 minutes
        enabled: !!id, // Only fetch when `id` is available
    });

    // Dispatch to Redux when data is available
    useEffect(() => {
        if (trailer) {
            dispatch(addTrailerVideo(trailer));
        }
    }, [trailer, dispatch]);

    return { trailer, isLoading, error };
};
