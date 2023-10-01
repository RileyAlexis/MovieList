import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";

//Material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";

function MovieResults() {

    const searchResults = useSelector(store => store.searchResults);
    const [checked, setChecked] = useState([]);
    const imgURL = 'https://image.tmdb.org/t/p/original';
    const [movieDetails, setMovieDetails] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleToggle = (value) => {
        if (checked.includes(value.id)) {
            setChecked(checked.filter((id) => id !== value.id));
        } else {
            setChecked([...checked, value.id]);
        }
    }

    const handleAdding = () => {
        
        console.table(checked);
        //Allows multiple requests to be made with one click
        checked.forEach((id) => {
            axios.post('/api/movie/movieDBDetails', {'movieId': id})
            .then((response) => {
                //Configures API response to match postgres database schema
                const dataObj = {
                    title: response.data.title,
                    description: response.data.overview,
                    poster: imgURL + response.data.poster_path,
                    genre_id: response.data.genres
                }
                dispatch({type: 'ADD_MOVIE', payload: dataObj});
            }).catch((error) => {
                console.error(error);
            })
    }) //End loop
    history.push('/');

    }

    return (
        <div className="searchResultsBox">
             <div className="addTheThing">
            <Button onClick={handleAdding}>Add Selected Movies to DB</Button>
        </div>
         <List dense sx={{width: '100%'}}>
            {searchResults.map((movie, index) => {
                const labelId = `checkbox-list-secondary-label-${movie.id}`;
                return (
                <>
                <ListItem key={movie.id}
                    secondaryAction={
                    <Checkbox
                        edge="end"
                        onChange={() => handleToggle(movie)}
                        checked={checked.includes(movie.id)}
                        />
                    }
                    >
                        <ListItemAvatar>
                            <Avatar alt={movie.title} src={imgURL + movie.poster_path} />
                        </ListItemAvatar>
                        <ListItemText primary={movie.title} secondary={movie.release_date} />
                    
                        </ListItem>
                </>
                )
            })}
        </List>
        </div>
    )
}

export default MovieResults;