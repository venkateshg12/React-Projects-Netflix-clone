import { API_OPTIONS } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';
const useUpcomingSeries = () => {
    return useQuery({
        queryKey:["upcomingSeries"],
        queryFn: async () =>{
            const response = await axios.get(API_URL,API_OPTIONS);
            // console.log(response.data.results);
            return response.data.results;
            
        },
        staleTime: 1000 * 60 * 5,
    });
}
export default useUpcomingSeries;