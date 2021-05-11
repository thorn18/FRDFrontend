import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import {Provider, useDispatch, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Post from '../src/models/post';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store;
(useSelector as jest.Mock).mockImplementationOnce(() => '');
// (useEffect as jest.Mock).mockImplementation()

let posts: Post[] = [];
beforeEach(() => {
  store = mockStore({
      postsState: {
          posts: posts,
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
  let  dispatch = jest.fn();
  console.log(posts);
  dispatch.mockImplementation((x): void => {
    let user = 'User';
    let token = 'testToken';
    return;
});

(useDispatch as jest.Mock).mockImplementation(() => {
    return dispatch;
});

  render(<Provider store={store}><App /></Provider>);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});