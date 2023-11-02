const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')
const axios = require('axios');
const dotenv = require('dotenv').config();

router.get('/', (req, res) => {

  const query = `SELECT "movie_id" AS "id", "title", "poster", "description", STRING_AGG("genres"."name", ', ') AS "genre_name"
  FROM "movies_genres"
  LEFT JOIN "movies" ON "movies"."id" = "movies_genres"."movie_id"
  LEFT JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
  GROUP BY "movies"."title", "movies"."id", "movies_genres"."movie_id";`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.put('/addNewMovie', (req, res) => {
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      const set_genre = 1; //Place holder until genres can be matched to API
      pool.query(insertMovieGenreQuery, [createdMovieId, set_genre]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.post('/OMDB', (req, res) => {
  const userString = req.body.searchStr;
  const searchStr = userString.replace(/[^a-zA-Z0-9]+/g, '+');
  const apiKey = process.env.OMDB_KEY;
  const OMDBURL = `http://www.omdbapi.com/?s=${searchStr}&apikey=${apiKey}`;
  console.log(OMDBURL);

  axios.get(OMDBURL)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(`Error making OMDB API request ${error}`);
      res.sendStatus(500);
    })
})

router.post('/movieDB', (req, res) => {
  const userString = req.body.searchStr;
  const searchStr = userString.replace(/[^a-zA-Z0-9]+/g, '+');
  const apikey = process.env.movieDb;
  const movieDBURL = `https://api.themoviedb.org/3/search/movie?query=${searchStr}&api_key=${apikey}`

  console.log(movieDBURL);
  axios.get(movieDBURL)
    .then((response) => {
      res.send(response.data.results);
    }).catch((error) => {
      console.error(`Error making MovieDB API request ${error}`);
      res.sendStatus(500);
    })
})

router.post('/movieDBDetails', (req, res) => {
  const movieId = req.body.movieId;
  const apikey = process.env.movieDb;
  const movieDBURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`
  axios.get(movieDBURL)
    .then((response) => {
      res.send(response.data);
    }).catch((error) => {
      console.error(`Error making MovieDB API request ${error}`);
      res.sendStatus(500);
    })}
  );

router.get('/movieDBGetGenres', (req, res) => {
  const apikey = process.env.movieDb;
  const movieDBURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`
  console.log(movieDBURL);
  axios.get(movieDBURL)
  .then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.error(`Error making MovieDB API request ${error}`);
    res.sendStatus(500);
  })}
);

router.post('/delete', (req, res) => {
  console.log(req.body.id);
  let queryString = 
        `DELETE FROM "movies_genres" WHERE "movies_genres"."id" = $1;`;
  pool.query(queryString, [req.body.id])
  .then((response) => {

            let queryString2 = `DELETE FROM "movies" WHERE "movies"."id" = $1;`
            pool.query(queryString2, [req.body.id])
            .then((response) => {
              res.sendStatus(201);
            }).catch((error) => {
              console.error(error);
              res.sendStatus(500);
            })
            
  }).catch((error) => {
    console.error(error);
    res.sendStatus(500);
  })



})

module.exports = router;