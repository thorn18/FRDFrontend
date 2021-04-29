import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import store from './store/store';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar/Navbar'
import LandingPage from './views/LandingPage/LandingPage'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App;
