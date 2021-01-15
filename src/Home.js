import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import logo from "./assets/logo.png";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // justifyItems: "center",
    },
    logo: {
        margin: "5%",
        height: "400px",
    },
    title: {
        margin: "5%",
    }
}));

export default function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={logo} className={classes.logo} alt="shopify-logo"/>
            <Typography variant="h2">
               2020 Shoppies Award
            </Typography>
        </div>
    )
}