import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    // get all movies on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // when individual movie is clicked
    // send info to be combined with genres
    // for details page
    function getDetails (movie) {
        console.log('in getDetails:', movie);
        dispatch({ 
            type: 'FETCH_DETAILS',
            payload: movie 
        });
        history.push('/details');
    };

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                                onClick={() => getDetails(movie)}
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;