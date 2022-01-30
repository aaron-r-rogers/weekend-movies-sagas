import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem, TextareaAutosize, Button, Input } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

function AddMovie() {
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres.map(genre => genre.name));
    const [genreSelection, setGenreSelection] = useState([]);

    const handleGenre = (event) => {
        console.log('genres are:', genres);
        const {
        target: { value },
        } = event;
        setGenreSelection(
        // on autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
        );
    };

    // new movie object for DB
    const [newMovie, setNewMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: "",
    });

    // get all genres on initialization
    useEffect(() => {
        dispatch({
        type: "FETCH_GENRES",
        });
    }, []);

    const onSubmitMovie = (event) => {
        // prevent page reload
        event.preventDefault();
        // dispatch new movie to add to DB
        dispatch({
        type: "ADD_MOVIE",
        payload: newMovie,
        });
        // return to list/home page
        history.push("/");
    };

    return (
    <>
    <Container component="main" maxWidth="xs">
        <Box
        sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        >
        <Typography variant="h5">Add a Movie</Typography>
        <Box
            component="form"
            onSubmit={onSubmitMovie}
            noValidate
            sx={{ mt: 1 }}
        >
            <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={newMovie.title}
            onChange={(event) =>
                setNewMovie({ ...newMovie, title: event.target.value })
            }
            />

            <TextField
            margin="normal"
            required
            fullWidth
            name="poster"
            label="Poster"
            type="poster"
            id="poster"
            value={newMovie.poster}
            onChange={(event) =>
                setNewMovie({ ...newMovie, poster: event.target.value })
            }
            />

            <TextareaAutosize
            rows={20}
            rowsMax={20}
            type="text"
            placeholder="Description"
            style={{ width: "100%" }}
            value={newMovie.description}
            onChange={(event) =>
                setNewMovie({ ...newMovie, description: event.target.value })
            }
            />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="select-genre">Genre</InputLabel>
                <Select
                labelId="select-genre"
                id="select-genre"
                multiple
                value={genreSelection}
                onChange={handleGenre}
                input={<OutlinedInput label="Genre" />}
                MenuProps={MenuProps}
                >
                {genres.map((genre) => (
                    <MenuItem
                    key={genre}
                    value={genre}
                    >
                    {genre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            <Button variant="contained" type="submit">
            Add Movie
            </Button>
            <Button
            variant="contained"
            onClick={() => {
                history.push("/");
            }}
            >
            Cancel
            </Button>
        </Box>
        </Box>
    </Container>
    </>
    );
}

export default AddMovie;
