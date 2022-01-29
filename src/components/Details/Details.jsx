import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details () {

    const history = useHistory();
    const dispatch = useDispatch();
    const movie = useSelector(store => store.selected);
    
    function onBackClick () {
        // empty selected reducer
        dispatch({ 
            type: 'SET_SELECTED',
            payload: ''
        });
        //return to main page
        history.push('/');
    }

    return(
        <>
        <h2>{movie.title}</h2>
        <img src={movie.poster}></img>  
        <h4>Genres: {movie.genres}</h4>
        <h5>Description: {movie.description}</h5>
        <button
            onClick={onBackClick}>
                Back to Movie List
        </button>
        </>
    )
}

export default Details;