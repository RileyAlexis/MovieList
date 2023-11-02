import { combineReducers, configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

import logger from 'redux-logger';


// Create the rootSaga generator function
function* rootSaga() {
    yield all ([
        takeEvery('FETCH_MOVIES', fetchAllMovies),
        takeEvery('FETCH_GENRES', fetchGenres),
        takeEvery('ADD_MOVIE', addMovie),
        takeEvery('DELETE_MOVIE', deleteMovie)
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

function* deleteMovie(action) {
    console.log('Delete Move', action.payload);
    try {
        const deleteId = yield axios.post(`api/movie/delete`, { id: action.payload });
    } catch (error) {
        console.error(error);
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
            }
        }
})


const searchResults = createSlice({
    name: 'searchResults',
    initialState: [],
    reducers: {
        setSearchResults: (state, action) => {
            return action.payload;
        }
    }
})

const genreIDs = createSlice({
    name: 'genreIDs',
    initialState: [],
    reducer: {
        setGenreIDs: (state, action) => {
            return action.payload;
        }
    }
})

const rootReducer = combineReducers({
    movies: movies.reducer,
    searchResults: searchResults.reducer,
    genreIDs: genreIDs.reducer
});


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['searchResults'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create one store that all components can use
const storeInstance = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware, logger),
});


const persistor = persistStore(storeInstance);
// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export { storeInstance, persistor };