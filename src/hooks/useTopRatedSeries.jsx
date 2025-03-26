import { API_OPTIONS } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

const useTopRatedSeries = () => {
    return useQuery({
        queryKey:["topRatedSeries"],
        queryFn: async () =>{
            const response = await axios.get(API_URL,API_OPTIONS);
            return response.data.results;
        },
        staleTime: 1000 * 60 * 5,
    });
}
export default useTopRatedSeries;