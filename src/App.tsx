import React, { useEffect } from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginComponent from './views/Login/LoginComponent';
import AuthRoute from '../src/components/AuthRoute'
import CreatePost from './views/CreatePost/CreatePost';
import { tokenInfo } from './components/AuthRoute';
import jwt_decode from 'jwt-decode';
import { AppState } from './store/postReducer';
import { loginSuccess } from './store/actions';

function App() {
  let token: any = useSelector((state: AppState) => state.userState.token);
  let dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      let decodedToken: tokenInfo = jwt_decode(token);
      dispatch(loginSuccess(decodedToken.nameid, token));
    }
  });

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
          <AuthRoute exact path="/newpost" component={CreatePost} />
        </Switch>
      </div>
    </HashRouter>
  )
}
export default App;
