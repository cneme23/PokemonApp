import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import Error from "./Error.js";

const formStyles = makeStyles({
  root: {
    width: "40%",
    margin: "0 auto",
  },
  form: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      borderColor: "white",
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
    },

    color: "white",
    margin: "40px auto 0 auto",
  },
});

const Contact = () => {
  const classes = formStyles();

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion de inputs vacíos
    if (
      data.name.trim() === "" ||
      data.email.trim() === "" ||
      data.message.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    setData({
      name: "",
      email: "",
      message: "",
    });
    console.log("Datos. cargados...");
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        {error && (
          <div style={{ textAlign: "center" }}>
            <Error mensaje="Todos los campos son obligatorios" />
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <h1 className="form-material__title">Contacto</h1>
        </div>
        <TextField
          type="text"
          id="name"
          label="Nombre *"
          margin="normal"
          variant="filled"
          autoFocus
          fullWidth
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <TextField
          type="email"
          id="email"
          label="Email *"
          margin="normal"
          variant="filled"
          fullWidth
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <TextField
          type="text"
          id="message"
          label="Mensaje *"
          margin="normal"
          variant="filled"
          multiline
          fullWidth
          name="message"
          value={data.message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Contact;
