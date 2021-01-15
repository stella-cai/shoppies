import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        // maxWidth: "0%",
        flexGrow: 1,
        width: "324px",
        height: "620px",
    },
    media: {
        height: "480px",
        width: "324px",
        justifyContent: "flex-end",
    },
    buttonContainer: {
        bottom: 0,
    }
});

export default function MovieCard(props) {
    const classes = useStyles();
    const {movieData, nominateMovie, isNominated} = props;

    const learnMore = () => {
        window.open("https://www.imdb.com/title/" + movieData.imdbID, "_blank")
    }

    return (
        <Card className={classes.card}>
            {/* <CardActionArea> */}
                <CardMedia
                    className={classes.media}
                    image={movieData.Poster}
                    title={movieData.Title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                        {movieData.Title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {movieData.Year}
                    </Typography>
                </CardContent>
            {/* </CardActionArea> */}

            <CardActions className={classes.buttonContainer}>
                <Button size="medium" color="primary" disabled={isNominated} onClick={() => nominateMovie(movieData.imdbID)}>
                    Nominate
                </Button>
                <Button size="medium" color="primary" onClick={learnMore}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
