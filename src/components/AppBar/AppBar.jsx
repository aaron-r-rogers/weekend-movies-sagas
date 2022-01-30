import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

function AppBarComponent () {

    return(
    <>
    <AppBar position="fixed">
        <Toolbar>
            <Link to="/add" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    Add Movie
                </Button>
            </Link>
        </Toolbar>
    </AppBar>
    </>
    )
};

export default AppBarComponent