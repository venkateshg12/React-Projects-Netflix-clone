import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContentDetails, addCreditDetails } from '../utils/slice/detailInfoSlice';
import { API_OPTIONS, Spinner } from '../utils/constant';

const useUpdateMovieDetails = () => {
    const dispatch = useDispatch();
    const type = useSelector(store => store?.typeId?.type);
    const id = useSelector(store => store?.typeId?.id);
    // console.log(type + " " + id);


    if (!type || !id) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    useEffect(() => {
        const getUpdateDetails = async () => {

            const endpoint = `https://api.themoviedb.org/3/${type}/${id}`;
            const data = await fetch(endpoint, API_OPTIONS);
            const dataJson = await data.json();
            dispatch(addContentDetails(dataJson));
            // console.log(dataJson);

            const credits = `https://api.themoviedb.org/3/${type}/${id}/credits`
            const dataCredits = await fetch(credits, API_OPTIONS);
            const dataCreditsJson = await dataCredits.json();
            dispatch(addCreditDetails(dataCreditsJson));
        }
        getUpdateDetails();
    }, [id, type, dispatch]);
}
export default useUpdateMovieDetails;