import {HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#42a5f5',
      },
      secondary: {
        main: '#cddc39',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
    <Router>

      <Route path="/" exact>
        <MovieList />
      </Route>
      
      <Route path="/details/:id" exact>
        <Details />
      </Route>

      <Route path="/add" exact>
        <AddMovie />
      </Route>

      </Router>
    </div>
    </ThemeProvider>
  );
}


export default App;
