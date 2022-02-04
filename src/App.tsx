import React, { useEffect } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginComponent from './views/Login/LoginComponent';
import { AppState } from './store/initialState';
import { loginSuccess } from "./store/userActions";

function App() {

  return (

    <HashRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/home" component={LandingPage} />
        </Switch>
      </div>
    </HashRouter>
  )
}
export default App;
