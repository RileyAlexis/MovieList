import {HashRouter as Router, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetail from '../MovieDetail/MovieDetail';
import MovieSearch from '../MovieSearch/MovieSearch';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
}, []);

  return (
    <div className="container">
      <div className="headerBox">
      <h1>The Movies Saga!</h1>
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
        <div className="movieDetailBox">
        <Route path="/detail/:id" component={MovieDetail} />
        {/* Details page */}
        </div>
  
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
