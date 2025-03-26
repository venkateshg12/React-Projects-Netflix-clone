import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';

const fetchTrailer = async (id) => {
    if (!id) return null; // Prevent API call if id is not available
    
    console.log(id);
    const  response  = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        API_OPTIONS
    );
    const results = response.data.results;
    const filterTrailerData = results.filter((video) => video.type === "Trailer");
    return filterTrailerData.length > 0 ? filterTrailerData[0] : data.results[0] || null;
};

const useTrailerUrl = (id) => {
    return useQuery({
        queryKey: ["trailer", id], // React Query cache key
        queryFn: () => fetchTrailer(id),
        enabled: !!id, 
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 2, 
    });
};

export default useTrailerUrl;