import { API_OPTIONS } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = "https://api.themoviedb.org/3/movie/top_rated?&page=1";
const useTopRated = () => {
    return useQuery({
        queryKey: ["topRatedMovies"],
        queryFn: async () => {
            const response = await axios.get(API_URL, API_OPTIONS);
            return response.data.results;
        },
        staleTime: 1000 * 60 * 5,
    });
}
export default useTopRated;
