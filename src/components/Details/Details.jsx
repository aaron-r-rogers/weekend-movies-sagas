import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


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
        <Container maxWidth="md" sx={{ mt: 2, p: 2}}>
        <Paper>
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">{movie.title}</Typography>
        </Box>
        <img src={movie.poster}></img>
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Genre:</Typography>
            <Typography variant="h6">
            {/* Splits strings in array into list separated by commas */}
            {movie.genres?.map(genre => genre).join(',  ')}
            </Typography>
        </Box>
        <Box sx={{ m: 3, p: 1 }}>
            <Typography variant="body1">{movie.description}</Typography>
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