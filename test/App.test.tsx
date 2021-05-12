import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import Post from '../src/models/post';
import * as fivePosts from './fivePosts.json'

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn()
// }));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useEffect: jest.fn()
// }));

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
  //   let  dispatch = jest.fn();
  //   console.log(posts);
  //   dispatch.mockImplementation((x): void => {
  //     let user = 'User';
  //     let token = 'testToken';
  //     return;
  // });

  // (useDispatch as jest.Mock).mockImplementation(() => {
  //     return dispatch;
  // });

  render(<Provider store={store}><App /></Provider>);

  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});