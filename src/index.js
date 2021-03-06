import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRE_DETAILS', fetchGenreDetails);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
};

// get all movies from the DB
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        // send movies from DB to movies reducer
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('index.js get movies error');
    } 
};

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

// retrieve all genres for AddMovie component
function* fetchGenres() {
    try {
        const response = yield axios.get('/api/genre');
        console.log('All genres:', response.data);
        yield put({
            type: 'SET_GENRES',
            payload: response.data
        });
    } catch {
        console.log('index.js get genres error');
    }
}

// store all genres returned from the server
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// called by dispatch when a movie is selected
function* fetchGenreDetails(action) {
    console.log('action.payload in fetchGenreDetails is:', action.payload);
    try {
        // get details for selected movie from DB
        const details = yield axios.get(`/api/genre/${action.payload}`);
        // sends genres for given id to reducer
        yield put({ 
            type: 'SET_SELECTED', 
            payload: details.data[0].genres

        });

    } catch {
        console.log('index.js get genres error');
    }
};

// used to store details of the selected movie
const selectedGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED':
            return action.payload;
        default:
            return state;
    }
};

// called by dispatch when a movie is selected
function* fetchMovieDetails(action) {
    console.log('action.payload in fetchMovieDetails is:', action.payload);
    try {
        // get details for selected movie from DB
        const info = yield axios.get(`/api/movie/${action.payload}`);
        // sends details for given id to reducer
        yield put({ 
            type: 'SET_DETAILS', 
            payload: info.data[0]
        });

    } catch {
        console.log('index.js get genres error');
    }
};

// movie-specific details returned from the server
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// add new movie to DB
function* addMovie(action) {
    try {
        axios.post('/api/movie', action.payload)
        // update state for list component
        yield put({ type: 'FETCH_MOVIES' });
    } catch (error) {
        console.log('get all error');
    }
}

// create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        selectedGenres,
        genres,
        details,
    }),
    // add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
