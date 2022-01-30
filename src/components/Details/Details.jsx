import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppBarComponent from '../AppBar/AppBar';

function Details () {

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    // this is the object with details for selected movie
    const selectedGenres = useSelector(store => store.selectedGenres);
    // this is used for state to persist through refresh
    const details = useSelector(store => store.details)

    // on page load/reload, fetch details where id equals params
    useEffect(() => {
        
        dispatch({ 
            type: 'FETCH_GENRE_DETAILS',
            payload: id 
        });
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS',
            payload: id 
        });
    }, []);
    
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
        <AppBarComponent />
        <Container maxWidth="md" sx={{ mt: 10, p: 2}}>
        <Paper>
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">{details.title}</Typography>
        </Box>
        <img src={details.poster}></img>
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Genre:</Typography>
            <Typography variant="h6">
            {/* Splits strings in array into list separated by comma and space */}
            {[selectedGenres]?.map(genre => genre).join(', ')}
            </Typography>
        </Box>
        <Box sx={{ m: 3, p: 1 }}>
            <Typography variant="body1">{details.description}</Typography>
        </Box>
        <Box sx={{ pb: 3 }}>
            <Button variant="contained"
                onClick={onBackClick}>
                Back to Movie List
            </Button>
        </Box>
        </Paper>
        </Container>
        </>
    )
};

export default Details;