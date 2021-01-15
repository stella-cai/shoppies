
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
        marginInline: "100px",
        marginBlock: "30px",
        color: "#FFFFFF",
    },
    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginRight: theme.spacing(2),
    },
}));

export default function Header() {
    const classes = useStyles();

    const headersData = [
        {
            label: "All Movies",
            href: "/movies",
        },
        {
            label: "My Nominees",
            href: "/nominees",
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
                    <Link to="/" style={{ textDecoration: 'none'}}>
                        <Typography className={classes.headerTitle} variant="h3">
                            The Shoppies
                        </Typography>
                    </Link>
                    <Container className={classes.buttonContainer}>
                        {getMenuButtons()}
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}