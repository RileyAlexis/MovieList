import react from 'react';
import { useState } from "react";

import axios from "axios";

//Material UI
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

function MovieSearch() {

    const [searchStr, setSearchStr] = useState('');
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [checked, setChecked] = useState([1]);

    const handleSearch = () => {
        if (searchStr !== '') {
            const dataObj = {
                searchStr: searchStr
            }
            axios.post('/api/movie/movieDB/', dataObj)
                .then((response) => {
                    setSearchResults(response.data);
                    setShowResults(true);
                    console.log('Response.data', response.data);
                    console.log('Search Results', searchResults)
                    console.log(showResults);
                }).catch((error) => {
                    console.error(error);
                })
        }
    }


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <>
        <TextField variant="filled"
            label="Title Search"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            />
        <Button variant="outlined" onClick={handleSearch}>Search</Button>
        <Typography variant="body" color="red">{error}</Typography>

{showResults &&
           <div>
            <ul>
            {searchResults.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
            ))
            }
            </ul>
           </div>
}
        </>
    )
        
}

export default MovieSearch;