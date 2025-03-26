import { API_OPTIONS } from "../utils/constant";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";


const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?langugage=en-us&page=1';
export const useNowPlayingMovies = () => {

    return useQuery({
        queryKey: ["nowPlayingMovies"],
        queryFn: async () => {
            const response = await axios.get(API_URL, API_OPTIONS);
            // console.log("useNowPlayingMovies");
            return response.data.results;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes (prevents refetching for 5 minutes)
    });
}



/* const dispatch = useDispatch();
const getNowPlayingMovies =  async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);
    console.log("getNowPlayingMovies");
    dispatch(addNowPlayingMovies(json.results));
}
return { fetch: getNowPlayingMovies }; */