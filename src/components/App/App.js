import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
    <AppBar position="fixed">
        <Toolbar>
          <Typography 
            variant="h5" 
            color="inherit"
            gutterBottom
            noWrap>
            The Movies Saga!
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Router>    

        <Route path="/" exact>
          <MovieList />
        </Route>
        
        <Route path="/details" exact>
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
