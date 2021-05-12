import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import * as fivePosts from './fivePosts.json'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store: MockStoreEnhanced;

beforeEach(() => {
  store = mockStore({
      postsState: {
          posts: fivePosts.items,
          loading: false,
          hasMoreItems: true
      },
      userState: {
        username: '',
        token: '',
        loggedIn: false,
        error: undefined
      }
  });
});

test("Renders application", () => {
  render(<Provider store={store}><App /></Provider>);
});