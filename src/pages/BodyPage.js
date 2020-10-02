import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/MediaCard";
import Button from "@material-ui/core/Button";
// Conectar mi componente con la store
import { connect } from "react-redux";
// Traigo los datos de la API
import { fetchPosts } from "../actions/postsAction";


const useStyles = makeStyles({
  root: {
    margin: "40px auto 0 auto",
    width: "80%",
  },
  gridItem: {
    margin: "15px",
    width: "500px",
    height: "500px",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
});

const BodyPage = ({ dispatch, posts, loading, hasErrors, search }) => {
  const classes = useStyles();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  // Datos del store
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Escucho cambios en "search" y "Posts"
  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => {
        return post.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, posts]);

  // UseEffect para la siguiente pagina
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      // Respuesta
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${20*nextPage}`
        
      );
      
      const data = await response.json();
      const dataWithImage = await Promise.all( data.results.map(async item => {
      const result = await fetch(item.url)
      const resultJson= await result.json()
           
      return {    name: item.name,     image: resultJson.sprites.front_default   } }))


      setNextPage(nextPage + 1);
      setFilteredPosts([].concat(filteredPosts, dataWithImage));
    } catch (error) {
      console.log(error);
    }
  };

  const renderPosts = () => {
    if (loading)
      return (
        <p style={{ color: "white", fontSize: "2rem" }}>Cargando posts...</p>
      );
    if (hasErrors)
      return <p style={{ color: "white" }}>Posts no disponibles...</p>;

    return filteredPosts.length === 0 ? (
      <p style={{ color: "white", fontSize: "2rem" }}>
        No se encontraron resultados...
      </p>
    ) : (
      filteredPosts.map((post) => (
        <Grid item className={classes.gridItem} key={post.id}>
          <MediaCard post={post} />
        </Grid>
      ))
    );
  };

  return (
    <div className={classes.root}>
      <Grid>
        <h1 className={classes.title}>Posts</h1>
      </Grid>
      <Grid
        container
        item xs={12} spacing={3}
        directon="row" 
        justify="space-evenly"
        alignItems="center"
        className={classes.grid}
      >
        {renderPosts()}
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={fetchCharacters}
        style={{ marginBottom: "10px" }}
      >
        Cargar más
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors,
});

export default connect(mapStateToProps)(BodyPage);
