import React, { useEffect } from 'react'
import { API_OPTIONS, IMAGE_BASE_URL } from '../utils/constant';
import no_poster from "../assets/no-movie.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUpdateMovieDetails from '../hooks/useUpdateMovieDetails';
import { addId, addType } from '../utils/slice/TypeIdSlice';

const MovieCard = ({ movie, type, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = movie || {};

  const movieType = type;
  const movieId = id;

  const handleClick = () => {
    dispatch(addType(movieType));
    dispatch(addId(movieId));
    navigate(`/${id}`);
  }

  return (
    <div>
      <div className="cursor-pointer" key={id} onClick={handleClick} >
        <figure className={`${className ||"md:h-[20rem] h-[17rem] py-2 md:w-[12rem] w-[10rem] md:my-5" } relative inline-block image`}>
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} className="block w-full h-full cursor-pointer hover:scale-[1.05] hover:brightness-100  brightness-80 rounded-xl z-50 transition duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] " alt="pictures" onError={(e) => e.currentTarget.src = no_poster} />
        </figure>
      </div>
    </div>
  )
}
export default MovieCard;