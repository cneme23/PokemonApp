import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchInfoPosts } from "../actions/infoPostAction";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "40px auto 0 auto",
    maxWidth: "500px",
    color: "#f7eaea",
    padding: "0 15px 80px 15px",
  },
  header: {
    "& .header__details": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    marginBottom: "10px",
    "& .header__details-social-item": {
      marginRight: "10px",
    },
  },
  image: {
    "& .image__img": {
      width: "100%",
    },
  },
  content: {
    fontSize: "18px",
    "& .content__subtitle": {
      marginTop: "40px",
    },
  },
});

const PostPage = ({ dispatch, info, loading, hasErrors }) => {
  const classes = useStyles();
  const { name } = useParams();
  const { height, weight, order, sprites } = info;
  console.log(info);
  let values = [];

  for (var key in origin) {
    values.push(origin[key]);
  }

  

  const style = {
    color: "white",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    console.log(name)
    dispatch(fetchInfoPosts(name));
  }, [dispatch, name]);

  const renderInfoPosts = () => {
    if (loading) return <p style={style}>Cargando información...</p>;
    if (hasErrors) return <p style={style}>Posts no disponibles...</p>;
    const image = sprites && sprites.front_default;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className="header__title">
            <h1>{name}</h1>
          </div>
          
        </div>
        <div className={classes.image}>
          <img className="image__img" src={image} alt="" />
        </div>
        <div className={classes.content}>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <p>Order: {order || "N/A"}</p>
          
          
          
        </div>
      </div>
    );
  };

  return renderInfoPosts();
};
const mapStateToProps = (state) => ({
  loading: state.info.loading,
  info: state.info.info,
  hasErrors: state.info.hasErrors,
});

export default connect(mapStateToProps)(PostPage);
