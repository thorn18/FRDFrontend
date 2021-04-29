import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './component/Navbar/Navbar'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
      </div>
    </Provider>
  );
}

export default App;
