import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    "& .MuiTypography-gutterBottom": {
      textTransform: "uppercase",
    },
    margin: "0 auto",
  },
  media: {
    height: 160,
  },
});

function MediaCard({ post }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.image}
          title="Contemplative Pokemons"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Link to={`/${post.name}`}>
          <Button size="small" color="primary" variant="contained">
            Leer más...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
