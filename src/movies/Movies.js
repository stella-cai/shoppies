import React, { useState, useEffect } from "react";
import { TextField, Grid, makeStyles, List, ListItem, ListItemText, Container, Button, Box } from "@material-ui/core";
import { URL, APIKEY } from "../api";
import axios from "axios";
import MovieCard from "./MovieCard";

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
        width: "90%",
        height: "5%",
        borderRadius: "10%",
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    card: {
        alignSelf: "flex-start",
        margin: "1%",
    }
}));

export default function Movies(props) {
    const classes = useStyles();

    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [nominees, setNominees] = useState(props.nominees);

    useEffect(() => {
        props.setNominees(nominees);
    }, [nominees])

    useEffect(() => {
        if(searchText){
            axios.get(URL, {
                params: {
                    apikey: APIKEY,
                    s: searchText,
                }
            })
                .then(response => {
                    if (response.data.Response === "True"){
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

    const nominateMovie = (movieID) => {
        console.log('nominees :>> ', nominees);
        console.log("nominated movie");
        console.log('movieID :>> ', movieID);
        if (!isNominated(movieID)) {
            const newNominees = [...nominees];
            newNominees.push(movieID);
            console.log('newNominees :>> ', newNominees);
            setNominees(newNominees);
        }

    }

    const isNominated = (movieID) => {
        console.log("inside isNominated");
        console.log('nominees :>> ', nominees);
        console.log('nominees.includes(movieID) :>> ', nominees.includes(movieID));
        const isIncluded = nominees.includes(movieID);
        return isIncluded;
    }

    const onChangeSearchText = (event) => {
        const text = event.target.value;
        console.log('text :>> ', text);
        setSearchText(text)
    }

    const moviesList = () => {
        console.log('searchResult :>> ', searchResult);
        const list = searchResult.map( (movieData) => {
            // console.log('movieData :>> ', movieData);
            return (
                <Box className={classes.card}>
                    <MovieCard movieData={movieData} nominateMovie={nominateMovie} isNominated={isNominated(movieData.imdbID)}/>
                </Box>
            )
        }   
        )
        return list;
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <TextField label="Movie title" variant="outlined" className={classes.searchBar} onChange={onChangeSearchText}/>

                <Grid container className={classes.cardContainer}>
                    {moviesList()}
                </Grid>
            </Grid>
        </div>
    );
};