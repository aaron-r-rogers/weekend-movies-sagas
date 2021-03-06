import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBarComponent from '../AppBar/AppBar';
import ReturnToTop from '../ReturnToTop/ReturnToTop';

function MovieList() {
    const dispatch = useDispatch();
    const history = useHistory();
    // all of the movies in DB from redux store:
    const movies = useSelector(store => store.movies);

    // get all movies on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // when individual movie is clicked
    // send info to be combined with genres
    // for details page
    function getGenreDetails (movie) {
        console.log('in getDetails movie.id is:', movie.id);
        dispatch({ 
            type: 'FETCH_MOVIE_DETAILS', 
            payload: movie.id
        });
        dispatch({ 
            type: 'FETCH_GENRE_DETAILS',
            payload: movie.id 
        });
        history.push(`/details/${movie.id}`);
    };

    return (
        <div>
        <ReturnToTop showBelow={250} />
        <AppBarComponent />
        <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
        >
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography
            component="h2"
            variant="h2"
            align="center"
            color="text.primary"
            >
            The Movies Saga
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Select from the list below to view details.
            </Typography>
        </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
            {movies.map(movie => {
            return (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                {/* <Link
                    style={{ textDecoration: 'none' }}
                    to={`/details/${movie.id}`}> */}
                    <Card sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        sx={{
                        pt: '56.25%',
                    }}
                    image={movie.poster}
                    alt={movie.title}
                    onClick={() => getGenreDetails(movie)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="h2"
                        >
                        {movie.title}
                        </Typography>
                    </CardContent>
                    </Card>
                    {/* </Link> */}
                </Grid>
            );
            })}
        </Grid>
        </Container>
        </div>
    );
}

export default MovieList;