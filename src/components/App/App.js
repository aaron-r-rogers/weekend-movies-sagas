import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
    <AppBar position="relative">
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

      </Router>
    </div>
    </ThemeProvider>
  );
}


export default App;
