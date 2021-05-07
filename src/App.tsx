import React from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginComponent from './components/Login/LoginComponent';
import AuthRoute from '../src/components/AuthRoute'


function App() {

  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/** This component will be used when we create a new post.*/}
            {/* <AuthRoute exact path="..." component={Post} /> */}
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/home" component={LandingPage} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  )
}
export default App;
