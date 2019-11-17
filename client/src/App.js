import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import PostCreate from "./pages/PostCreate/PostCreate";
import PostView from "./pages/PostView/PostView";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={PostCreate} />
        <Route path="/post/create" component={PostCreate} />
        <Route path="/post/view" component={PostView} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;