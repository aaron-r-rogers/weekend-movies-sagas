import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details () {

    const history = useHistory();
    const dispatch = useDispatch();
    // this is the object with details for selected movie
    const movie = useSelector(store => store.selected);
    console.log('movie is:', movie)
    
    // when "Back to Movie List" button is clicked
    function onBackClick () {
        // empty selected reducer
        dispatch({ 
            type: 'SET_SELECTED',
            payload: ''
        });
        //return to main page
        history.push('/');
    };

    return(
        <>
        <h2>{movie.title}</h2>
        <img src={movie.poster}></img>  
        {/* <h4> */}
            {movie.genres.length > 1 ? (
                <h4>Genres:</h4>
            ) : (
                <h4>Genre:</h4>
            )}
            {/* {movie.genres.length > 0 && 'Genre'}
            {movie.genres.length > 1 && 's:'}
        </h4> */}
        <div>
        {movie.genres?.map(genre => genre).join(',  ')}
        </div>
        <h5>Description: {movie.description}</h5>
        <button
            onClick={onBackClick}>
                Back to Movie List
        </button>
        </>
    )
};

export default Details;