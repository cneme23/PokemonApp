import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "40px auto 0 auto",
    width: "60%",
    color: "white",
    fontSize: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
});

const Error404 = () => {
  const classes = useStyles();

  return <div className={classes.root}>ERROR 404</div>;
};

export default Error404;
