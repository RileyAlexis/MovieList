import {HashRouter as Router, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetail from '../MovieDetail/MovieDetail';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
}, []);

  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/detail" component={MovieDetail} />
        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
