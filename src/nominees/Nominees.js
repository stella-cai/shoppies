import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Box } from "@material-ui/core";
import NomineeCard from "./NomineeCard";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingInline: "5%",
        paddingTop: "2%",
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        margin: "1%",
    }
}));

export default function Nominees(props) {
    const classes = useStyles();

    const [nominees, setNominees] = useState(props.nominees);
    const setPropsNominees = props.setNominees;
    
    useEffect(() => {
        setPropsNominees(nominees);
    }, [nominees, setPropsNominees])

    const moviesList = () => {
        const list = nominees.map((movieID) => {
            console.log('movieID :>> ', movieID);
            return (
                <Box className={classes.card}>
                    <NomineeCard movieID={movieID} unNominateMovie={() => unNominateMovie(movieID)}/>
                </Box>
            )
        }
        )
        return list;
    }

    const unNominateMovie = (movieID) => {
        console.log('nominees :>> ', nominees);
        console.log("nominated movie");
        console.log('movieID :>> ', movieID);
        const index = nominees.indexOf(movieID);
        if (index > -1) {
            const newNominees = [...nominees];
            newNominees.splice(index, 1);
            console.log('newNominees :>> ', newNominees);
            setNominees(newNominees);
        }
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {moviesList()}
            </Grid>
        </div>
    );
};