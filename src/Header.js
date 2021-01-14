
import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolbar: {
        width: "100%",
        padding: 0,
    },
    headerTitle: {
        flexGrow: 1,
        margin: "20px",
    },
    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginRight: theme.spacing(2),
    },
}));

export default function Header() {
    const classes = useStyles();

    const displayTitle = () => {
        return (
            <Toolbar className={classes.toolbar}>
                {headerTitle}
                <Container className={classes.buttonContainer}>
                    {getMenuButtons()}
                </Container>
            </Toolbar>
        );
    };

    const headerTitle = (
        <Typography className={classes.headerTitle} variant="h3">
            Movie Search
        </Typography>
    );

    const headersData = [
        {
            label: "All Movies",
            href: "/movies",
        },
        {
            label: "My Nominees",
            href: "/nominees",
        },
        {
            label: "Log Out",
            href: "/logout",
        },
    ];

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button className={classes.menuButton}
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: Link,
                    }}
                >
                    <Typography variant="h5">
                        {label}
                    </Typography>
                </Button>
            );
        });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.headerTitle} variant="h3">
                        Shopify Movie Award
                    </Typography>
                    <Container className={classes.buttonContainer}>
                        {getMenuButtons()}
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}