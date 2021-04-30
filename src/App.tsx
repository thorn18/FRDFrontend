import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './component/Navbar/Navbar'
import PaginationList from './post/paginationList';
import PostList from './post/PostList';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <PostList/>
      </div>
    </Provider>
  );
}

export default App;
