import React, { useState, useEffect } from "react";
import { FormControl, Grid, makeStyles, InputAdornment, InputLabel, Container, OutlinedInput, Box, Typography } from "@material-ui/core";
import { URL, APIKEY } from "../api";
import axios from "axios";
import MovieCard from "./MovieCard";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        flexDirection: "column",
        paddingInline: "5%",
        paddingTop: "2%",
        flexGrow: 1,
    },
    searchBar: {
        flexGrow: 1,
        height: "5%",
        borderRadius: "10%",
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        alignSelf: "center",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    card: {
        alignSelf: "flex-start",
        margin: "1%",
    },
    banner: {
        width: "90%",
        backgroundColor: "#FAF6EA",
        border: 1,
        borderStyle: "solid",
        borderRadius: "15px",
        paddingInline: "20px",
        paddingBlock: "10px",
        marginBottom: "1%",
    },
    bannerText: {
        colorInherit: "#000000",
    }
}));

export default function Movies(props) {
    const classes = useStyles();

    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [nominees, setNominees] = useState(props.nominees);
    const setPropsNominees = props.setNominees;

    useEffect(() => {
        setPropsNominees(nominees);
    }, [nominees, setPropsNominees])

    useEffect(() => {
        if (searchText) {
            axios.get(URL, {
                params: {
                    apikey: APIKEY,
                    s: searchText,
                }
            })
                .then(response => {
                    if (response.data.Response === "True") {
                        setSearchResult(response.data.Search);
                    }
                    else {
                        setSearchResult([])
                    }
                })
                .catch(err => {
                    console.log('err :>> ', err);
                })
        }
        else {
            setSearchResult([])
        }

    }, [searchText]);

    const canNominateMore = () => {
        console.log('nominees.length :>> ', nominees.length);
        return nominees.length < 5;
    }

    const nominateMovie = (movieID) => {
        if (canNominateMore() && !isNominated(movieID)) {
            const newNominees = [...nominees];
            newNominees.push(movieID);
            setNominees(newNominees);
        }
    }

    const isNominated = (movieID) => {
        const isIncluded = nominees.includes(movieID);
        return isIncluded;
    }

    const onChangeSearchText = (event) => {
        const text = event.target.value;
        setSearchText(text)
    }

    const moviesList = () => {
        const list = searchResult.map((movieData) => {
            return (
                <Box className={classes.card}>
                    <MovieCard movieData={movieData} nominateMovie={nominateMovie} isNominated={isNominated(movieData.imdbID)} />
                </Box>
            )
        }
        )
        return list;
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {!canNominateMore() &&
                    <Container className={classes.banner}>
                        <Typography variant="h5" color="inherit" className={classes.bannerText} align="center">
                            You have already nominated 5 movies.
                    </Typography>
                    </Container>}

                <Grid container spacing={1} alignItems="flex-end">
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="movie-title">Movie title</InputLabel>
                        <OutlinedInput
                            onChange={onChangeSearchText}
                            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            label="Movie title"
                        />
                    </FormControl>
                </Grid>
                <Grid container className={classes.cardContainer}>
                    {moviesList()}
                </Grid>
            </Grid>
        </div>
    );
};