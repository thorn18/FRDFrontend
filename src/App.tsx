import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
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
      <BrowserRouter>
        <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/* <AuthRoute exact path="..." component={Post} /> */}
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/home" component={LandingPage} />
          </Switch>

        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App;
