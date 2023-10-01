import react from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";

//Material UI
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";


function MovieSearch() {

    const [searchStr, setSearchStr] = useState('');
    const [error, setError] = useState('');
    const searchResults = useSelector(store => store.searchResults);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSearch = () => {
        if (searchStr !== '') {
            const dataObj = {
                searchStr: searchStr
            }
            axios.post('/api/movie/movieDB/', dataObj)
                .then((response) => {
                    dispatch({type: 'SET_RESULTS', payload: response.data});
                    history.push('/results');
                }).catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <div className="searchingBox">
        <Typography
        variant='body'>Add new titles from The Movie Database!</Typography>
        
        <TextField variant="filled"
            label="Title Search"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            />
        <Button variant="outlined" onClick={handleSearch}>Search</Button>
        <Typography variant="body" color="red">{error}</Typography>
    </div>
    )
}

export default MovieSearch;