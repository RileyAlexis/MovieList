import { createStore, combineReducers, applyMiddleware } from 'redux';
import { configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

import logger from 'redux-logger';

// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, movies)


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
        const movies = yield axios.get('/api/movie/');
        yield put({type: 'movies/setAllMovies', payload: movies.data});

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
const movies = createSlice({
    name: 'movies',
    initialState: [],
    reducers: {
        setAllMovies: (state, action) => {
                return action.payload;
            },
        },
})


const searchResults = createSlice({
    name: 'searchResults',
    initialState: [],
    reducers: {
        setSearchResults: (state, action) => {
            switch (action.type) {
                case 'SET_RESULTS': return action.payload;
                default:
                    return state;
            }
        }
    }
})

const genreIDs = createSlice({
    name: 'genreIDs',
    initialState: [],
    reducer: {
        setGenreIDs: (state, action) => {
            switch (action.type) {
                case 'SET_GENRES': return action.payload;
                default:
                    return state;
            }
        }
    }
})

const rootReducer = {
    movies: movies.reducer,
    searchResults: searchResults.reducer,
    genreIDs: genreIDs.reducer,
};

// Create one store that all components can use
const storeInstance = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware, logger),
});


// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;