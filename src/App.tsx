import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import PostComponent from './post/PostComponent';
import Post from './models/post';

function App() {

  const date = new Date();
  const props: Post = {
    post: {
      id: '1',
      username: 'Bob',
      description: 'My test post!',
      timestamp: date,
      likes: 0,
      imageId: 'image'
    },
    user: {
      id: '',
      username: '',
      profileImage: ''
    },
    comments: []
  }
  return (
    <Provider store={store}>
      <PostComponent post={props}></PostComponent>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div> */}
    </Provider>
  );
}

export default App;
