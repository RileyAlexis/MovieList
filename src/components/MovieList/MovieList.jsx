import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import './MovieList.css'

//Material UI
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function MovieList() {
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    const handleDetail = (id) => {
        history.push(`/detail/${id}`);
    }

    return (
        <div className="movieImageBox">
            <ImageList variant='masonry' cols={5} gap={5}
                sx={{
                    width: 1,
                }}
            >
                {movies.map(movie => (
                        <ImageListItem 
                            onClick={() => handleDetail(movie.id)}
                            key={movie.id}>
                            <img src=
                                {`${movie.poster}?w=248&fit=crop&auto=format`}
                                alt={movie.title}
                                loading="lazy" />
                        <ImageListItemBar
                            title={movie.title}
                            subtitle={movie.genre_name}
                            actionIcon={<InfoIcon />}
                            // position="below" 
                            />   
                        </ImageListItem>

                ))}

            </ImageList>
        </div>

    );
}

export default MovieList;