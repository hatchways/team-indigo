import "./App.css";

import React from "react";
// import { useSelector, useDispatch } from 'react-redux'

import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import Header from './components/Header'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import PostCreate from "./pages/PostCreate/PostCreate";
import PostView from "./pages/PostView/PostView";
import SignUp from './pages/SignUp/SignUp';
import Login from "./pages/Login/Login";

function App() {

  // const user = useSelector(state => state.user)
  // const dispatch = useDispatch();

  // console.log(user.username, user.token)
  
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/post/create" component={PostCreate} />
        <Route path="/post/view" component={PostView} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;