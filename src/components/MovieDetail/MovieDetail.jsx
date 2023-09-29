import { useSelector } from "react-redux";


function MovieDetail() {

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    return (
        <>
        {JSON.stringify(movies)}
        <br /><br />
        {JSON.stringify(genres)}
        </>
    )
}

export default MovieDetail;