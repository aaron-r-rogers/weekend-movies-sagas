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
        <>
        <Box
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}
        >
        <Container maxWidth="sm">
            <Typography
            component="h2"
            variant="h2"
            align="center"
            color="text.primary"
            >
            The Movies
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
                    onClick={() => getDetails(movie)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            );
            })}
        </Grid>
        </Container>
        </>
    );
}

export default MovieList;