import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

function MovieDetail() {

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    const { id } = useParams();
    const dispatch = useDispatch();
    let movieDetails = [];
    movieDetails = movies.filter((obj) => obj.id == id)

    

    const fetchData = () => {
        dispatch({type: 'FETCH_MOVIES'});

    }

    window.onbeforeunload = function () {
        
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
        </div>
        <div className="movie-detail-genres">
        <Typography variant="h6">{JSON.stringify(movieDetails[0].genre_name)}</Typography>
        </div>
    
    </div>
    )
}

export default MovieDetail;