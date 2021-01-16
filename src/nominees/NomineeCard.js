import React, { useState, useEffect }  from 'react';
import { makeStyles, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { URL, APIKEY } from "../api";
import axios from "axios";

const useStyles = makeStyles({
    card: {
        padding: "2%",
    },
    container: {
        display: "flex",
        flexDirection: "row",
    },
    details: {
        // flexGrow: 1,
        flex: 1,
        // height: "100%",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    media: {
        height: "402px",
        minWidth: "272px",
    },
    unNominateButton: {
        alignSelf: "flex-end",
    },
    plot: {
        marginBlock: "1%",
    },
});

export default function NomineeCard(props) {
    const classes = useStyles();
    const movieID = props.movieID;
    const [movieData, setMovieData] = useState({})

    useEffect(() => {
        axios.get(URL, {
            params: {
                apikey: APIKEY,
                i: movieID,
                plot: "full",
            }
        })
            .then(response => {
                if (response.data.Response === "True"){
                    console.log('response.data :>> ', response.data);
                    setMovieData(response.data);
                }
                else {
                    setMovieData({})
                }
            })
            .catch(err => {
                console.log('err :>> ', err);
            })
    }, [movieID])

    return (
        <Card className={classes.card}>
                <div className={classes.container}>
                    <CardMedia
                        className={classes.media}
                        image={movieData.Poster}
                        title={movieData.Title}
                    />
                    <CardContent className={classes.details}>
                        <Typography gutterBottom variant="h3" noWrap>
                            {movieData.Title + " (" + movieData.Year + ")"}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {movieData.Actors}
                        </Typography>
                        <Typography variant="b1" color="textSecondary" component="p" className={classes.plot}>
                            {movieData.Plot}
                        </Typography>
                        <Button size="medium" color="secondary" className={classes.unNominateButton} onClick={props.unNominateMovie}>
                            Un-nominate
                        </Button>
                    </CardContent>
                </div>
        </Card>
    );
}
