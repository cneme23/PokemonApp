import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import theme from "./components/theme";
import BodyPage from "./pages/BodyPage";
import Contact from "./components/Contact";
import PostPage from "./pages/PostPage";
import Error404 from "./components/Error404";
import { fetchPostsByName } from "./actions/postsAction";
import { connect } from "react-redux";


function App({dispatch}) {
  const [search, setSearch] = useState("");

  // Tomo el valor del input
  const handleChange = (e) => {
    setSearch(e.target.value)
    dispatch(fetchPostsByName(e.target.value))
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar handleChange={handleChange} search={search} />
        <Switch>
          <Route exact path="/" children={<BodyPage search={search} />} />
          <Route
            exact
            path="/hooks-redux-posts/"
            children={<BodyPage search={search} />}
          />
          <Route exact path="/contact" children={<Contact />} />
          <Route exact path="/:name" children={<PostPage />} />
          <Route component={Error404} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}


export default connect()(App);
