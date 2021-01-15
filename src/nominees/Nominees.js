import React, { useState, useEffect } from "react";
import { TextField, Grid, makeStyles, List, ListItem, ListItemText, Container, Button, Box } from "@material-ui/core";
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

    const moviesList = () => {
        const list = nominees.map((movieID) => {
            console.log('movieID :>> ', movieID);
            return (
                <Box className={classes.card}>
                    <NomineeCard movieID={movieID} />
                </Box>
            )
        }
        )
        return list;
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {moviesList()}
            </Grid>
        </div>
    );
};