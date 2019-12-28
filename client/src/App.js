import "./App.css";

import React from "react";
// import { useSelector, useDispatch } from 'react-redux'

import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import Header from './components/Header'
import ProfilePage from './pages/ProfilePage'
import LandingPage from './pages/LandingPage'
import PostCreate from "./pages/PostCreate/PostCreate";
import PostView from "./pages/PostView";
import SignUp from './pages/SignUp/SignUp';
import Login from "./pages/Login/Login";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/post/create" component={PostCreate} />
        <Route path="/post/view" component={PostView} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;