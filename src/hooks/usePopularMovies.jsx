import { API_OPTIONS } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/popular?&page=1';
const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const response = await axios.get(API_URL, API_OPTIONS);
      // console.log("popularMovies");

      return response.data.results;
    },
    staleTime: 1000 * 60 * 5
  });
}
export default usePopularMovies;
