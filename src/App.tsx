import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginComponent from './components/Login/LoginComponent';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App;
