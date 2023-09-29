import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Typography } from "@mui/material";

function MovieDetail() {

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    const { id } = useParams();
    let movieDetails = [];
    movieDetails = movies.filter((obj) => obj.id == id)

    console.log('Movies List', movies);
    console.log('Movies Detail', movieDetails);
    return (
        <div className="moveDetailBox">
                <Typography variant="h5">{movieDetails[0].title}</Typography>
                <img src={movieDetails[0].poster} />
                <Typography variant="body">{movieDetails[0].description}</Typography>
        </div>
    )
}

export default MovieDetail;