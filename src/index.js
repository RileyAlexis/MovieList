import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield all ([
        takeEvery('FETCH_MOVIES', fetchAllMovies),
        takeEvery('FETCH_GENRES', fetchGenres),
        takeEvery('ADD_MOVIE', addMovie)
    ])
}

function* addMovie(action) {
    try{
        const addMovie = yield axios.put('/api/movie/addNewMovie', action.payload)
        console.log('AddMovie Payload', action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch {
        console.error('Error adding Movie');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('api/movie/movieDBGetGenres');
        console.log('Genres', genres);
        yield axios.post('/api/movie/updateAllGenres', genres);
            console.log('Next part', genres);
    } catch {
        console.log('Error updating genre data');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const searchResults = (state = [], action) => {
    if (action.type === 'SET_RESULTS') {
        return action.payload;
    } 
    return state;
}

const genreIDs = (state = [], action) => {
    if (action.type === 'SET_GENRES') {
        return action.payload;
    }
    return state;
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        searchResults,
        genreIDs
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
