import React, { useEffect, useRef, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, BackHome, FindButton, Loader, Netflix_Logo } from '../utils/constant';
import NetflixIntro from './NetflixIntro';
import cross from "../assets/cross.svg"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGptMovieDetails, addGptSeriesDetails, addInfoState, addMovieCategory, addSeriesCategory, removeInfo, removeInfoState } from '../utils/slice/gptSlice';
import GptInfo from './GptInfo';
import { addPage } from '../utils/slice/TypeIdSlice';
import { resetMovieData } from '../utils/slice/detailInfoSlice';
import MenuSvg from '../utils/MenuSvg';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SearchInDB = async (iterate, type) => {

  const data = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${iterate}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
  const json = await data.json();
  const result = json.results[0] || null;
  return result;
}
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);
  const store = useSelector(store => store?.info?.showInfo);
  const page = useSelector(store => store?.typeId?.page);


  useEffect(() => {
    dispatch(addPage("/gptSearch"));
  }, [])
  const handelGptSearch = async () => {
    dispatch(removeInfo());
    setIsLoading(true);
    const gptQuery = `You are a highly knowledgeable movie and series recommendation system. 
                      Based on the user query: "${searchText.current.value}", determine exactly what the user is asking for:  

                      1. Movies Only → If the query is asking only for movies, return:  
                         - A JSON object containing only movies containing 4 movies.  
                         - "movieCategory" must be set based on the genre.  
                         - "series" and "seriesCategory" must be null.  

                      2. Series Only → If the query is asking only for series (TV shows, web series), return:  
                         - A JSON object containing only series containing 4 series.  
                         - "seriesCategory" must be set based on the genre.  
                         - "movies" and "movieCategory" must be null.  

                      3. Both Movies & Series → If the query explicitly asks for series and movies, return both.  

                      4. Unrelated Query → If the request is not about movies or series, return:  
                         {"isSuccess": false} and do not answer.  

                      Response Format  

                      Movies Only Example:  
                      {
                        "isSuccess": true, 
                        "movieCategory": "Top Sci-Fi Movies",
                        "seriesCategory": null,
                        "movies": ["Inception", "Interstellar", "Blade Runner 2049", "The Matrix"], 
                        "series": null
                      }

                      Series Only Example:  
                      {
                        "isSuccess": true, 
                        "movieCategory": null,
                        "seriesCategory": "Best Thriller Series",
                        "movies": null, 
                        "series": ["Breaking Bad", "Dark", "Sherlock", "Mindhunter"]
                      }

                      Both Movies & Series Example (only if user asks for both explicitly):  
                      {
                        "isSuccess": true, 
                        "movieCategory": "Top Action Movies",
                        "seriesCategory": "Best Action TV Shows",
                        "movies": ["Mad Max: Fury Road", "John Wick", "Gladiator", "Die Hard"], 
                        "series": ["The Boys", "Daredevil", "Peaky Blinders", "Jack Ryan"]
                      }

                      Unrelated Query Example:  
                      {
                        "isSuccess": false
                      }

                      Strict Rules:  
                      - If the user asks for only series, "movies" must be null.  
                      - If the user asks for only movies, "series" must be null.  
                      - Return only what the user requests, no extra recommendations.  
                      - Do not answer unrelated queries.  
                      - Return only valid JSON output.  
    `;


    const prompt = `${gptQuery}`;
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const cleanResponse = response.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanResponse);

    if (!data.isSuccess) {
      setShowError(true)
      return;
    } else {
      setShowError(false)
    }
    // let searchArray = [];
    if (data.movies && Array.isArray(data.movies) && data.movies.length > 0) {
      const movies = data.movies;
      const searchArray = movies.map((flix) => SearchInDB(flix, "movie"));
      const searchResults = (await Promise.all(searchArray)).flat();
      dispatch(addGptMovieDetails(searchResults));
      dispatch(addMovieCategory(data.movieCategory));
      // searchArray = [...moviePromises];
      // [Promise, Promise, Promise, Promise]
    }
    if (data.series && Array.isArray(data.series) && data.series.length > 0) {
      const series = data.series;
      const searchArray = series.map((show) => SearchInDB(show, "tv"));
      const searchResults = (await Promise.all(searchArray)).flat();
      dispatch(addGptSeriesDetails(searchResults))
      dispatch(addSeriesCategory(data.seriesCategory));
      // searchArray = [...seriesPromises];
      // [Promise, Promise, Promise, Promise]
    }
    if (!store) {
      dispatch(addInfoState());
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }


  const clearInput = () => {
    if (searchText.current) {
      searchText.current.value = "";
    }
  }


  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(!openNavigation);
    } else {
      setOpenNavigation(!openNavigation);
    }
  }

  return (
    <div>
      <NetflixIntro />
      <div className='relative flex z-50 top-2 items-center justify-between px-5'>
        <Netflix_Logo />
        <div className='flex gap-3'>
          <FindButton />
          <BackHome />
        </div>
      </div>
      <button className="absolute md:hidden top-4 right-2 z-50 p-2 scale-[1.04] mr-2 rounded-md border-2 border-white" onClick={toggleNavigation}>
        <MenuSvg openNavigation={openNavigation} />
      </button>
      {openNavigation && (
        <>
          <div className='absolute w-full h-screen backdrop-blur-xl font-sora  top-0 z-45'>
            <div className='flex items-center flex-col gap-7  mt-[50%]  h-full'>
              <a href="/findmovie" className="link">Find a movie/series</a>
              <a href="/browse" className="link">Home</a>
            </div>
          </div>
        </>
      )}
      <div className="relative z-40 mt-[30%] md:mt-[10%] w-full flex-col flex gap-5 justify-center items-center px-4">
        <div className="w-full max-w-2xl p-5 rounded-xl  bg-gray-800 flex flex-col sm:flex-row gap-4 items-center shadow-lg">
          <form className="w-full relative sm:flex-grow " onSubmit={(e) => e.preventDefault()}>
            <div className='relative flex  border-3 rounded-xl px-3 border-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-100'>
              <input
                ref={searchText}
                type="text "
                className="w-full text-lg py-3 placeholder:hidden bg-transparent border-none outline-none"
                placeholder="Suggest some horror movies"
              />
              <button
                type='button'
                className=' md:top-4.5 hover:scale-[1.3] cursor-pointer'
                onClick={clearInput}
              >
                <img src={cross} alt="cross" className='w-5 h-5' />
              </button>
            </div>
          </form>
          <button className="bg-red-500 text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] text-lg sm:text-xl px-8 py-3 font-bold focus:ring-amber-50 rounded-xl cursor-pointer  transition-all hover:scale-[1.03] " onClick={handelGptSearch}>
            Search
          </button>
        </div>
        {showError && (
          <div>
            <span className="px-5 py-2 bg-white flex flex-wrap text-lg  md:text-2xl max-w-xl text-center font-cut font-bold rounded-2xl text-red-500">
              Search only movies and series
            </span>
          </div>
        )}
      </div>
      {!showError &&  isLoading && <Loader />}
      {store && !isLoading && <GptInfo />}
    </div>
  )
}
export default GptSearch; 