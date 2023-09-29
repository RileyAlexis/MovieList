import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './MovieList.css'

function MovieList() {
    const movies = useSelector(store => store.movies);

    const handleDetail = (id) => {
        console.log(id);

    }


    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className="movie-title-box" key={movie.id} onClick={() => handleDetail(movie.id)}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;