import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Typography } from "@mui/material";
import swal from 'sweetalert';

function MovieDetail() {

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    const { id } = useParams();
    let movieDetails = [];
    movieDetails = movies.filter((obj) => obj.id == id);
    const dispatch = useDispatch();

    useEffect(() => {
       window.scrollTo(0,0);
    }, []);

    const deleteMovie = () => {
        swal({
            title: `Confirm delete ${movieDetails[0].title}`,
            text: "This will remove the title from your database. It may be readded by searching",
            icon: "warning",
            dangerMode: true,
            buttons: true,
            closeOnClickOutside: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                dispatch({type: 'DELETE_MOVIE', payload: movieDetails[0].id});
            } 
        }) 
    }

    return (        
        <div className="movieDetailSubBox">
           <div className="movie-detail-poster">
           <img width="250" src={movieDetails[0].poster} />
           </div> 
            
    <div className="movie-detail-titleBox">
        <Typography variant="h5">{movieDetails[0].title}</Typography>
        </div>
        <div className="movie-detail-description">
        <Typography variant="body">{movieDetails[0].description}</Typography>
        
        <div className="movie-detail-genres">
            <br /><br />
        <Typography variant="h6">Genres: {JSON.stringify(movieDetails[0].genre_name)}</Typography>
        </div>
        <div className="buttonBox">
            <Button onClick={deleteMovie}>Delete</Button>
        </div>
        </div>
        
    
    </div>
    )
}

export default MovieDetail;