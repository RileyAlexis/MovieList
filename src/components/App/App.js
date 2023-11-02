import {HashRouter as Router, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import Link from '@mui/material/Link';
import { Button } from '@mui/material';

import MovieList from '../MovieList/MovieList'
import MovieDetail from '../MovieDetail/MovieDetail';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieResults from '../MovieResults/MovieResults';
import Footer from '../Footer/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
}, []);

const updateGenres = () => {
  dispatch({type: 'FETCH_GENRES'})
}

  return (
    <div className="container">
      <div className="headerBox">
      <h1>Movie List</h1>
      {/* <Button onClick={updateGenres}>Update Genre Data</Button> */}
      <Link href="/" underline="none">My Movies </Link>

      <Link href="#/results/" underline="none">Search Results</Link>
      </div>
      <Router>        

        <Route path="/" exact>
          <div className="movielistBox">
          <MovieList />
          </div>
          <div className="movieSearchBox">
          <MovieSearch />
          </div>
        </Route>
        
        <Route path="/detail/:id">
        <div className="movieDetailBox">
          <MovieDetail />
        </div>
        </Route>
        {/* Details page */}
        <Route path="/results">
          <MovieResults />
          <div className="movieSearchBox">
          <MovieSearch />
          </div>
          </Route>
  
        {/* Add Movie page */}
      </Router>
      <div className="footerBox">
      <Footer />
      </div>
    </div>
  );
}


export default App;
