import React from "react";
import * as redux from 'react-redux';
import { Provider, useDispatch } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";
import "@testing-library/jest-dom/extend-expect";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

let store;

afterEach(cleanup);

describe('unathenticated user tests', () => {

  beforeEach(() => {
    store = mockStore({
      userState: {
        token: '',
        loggenIn: false
      }
    });
  });

  it('displays logos', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    expect(getByTestId('nav-logo')).toBeVisible();
  });

  it('displays search bar', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    expect(getByTestId('search-bar')).toBeVisible();
  });

  it('recognizes input in search bar', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar/></Provider>);

    const targetValue = 'A';

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'A' } });

    expect(getByTestId('search-bar').getAttribute("value")).toEqual(targetValue);
  });

  it('renders with menu closed and no post button', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    expect(getByTestId('placeholder-btn')).toBeVisible();
  });

  it('displays login button', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    fireEvent.click(getByTestId('toggle-btn'));

    expect(getByTestId('login-link')).toBeVisible();
  });

  it('Navigates to login screen when clicking on login', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('toggle-btn'));
    fireEvent.click(getByTestId('login-link'));

    expect(history.location.pathname).toBe('/login');
  });
});

describe('authenticated user tests', () => {

  beforeEach(() => {
    store = mockStore({
      userState: {
        token: 'a',
        loggedIn: true
      }
    });
  });

  it('displays logos', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    expect(getByTestId('nav-logo')).toBeVisible();
  });

  it('displays search bar', () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);
  
    expect(getByTestId('search-bar')).toBeVisible();
  });

  it("renders with menu closed and post button", () => {
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);

    expect(getByTestId('post-btn')).toBeVisible();
  });
  
  it("displays logout button", () => {  
    const { getByTestId } = render(<Provider store={store}><Navbar /></Provider>);
  
    fireEvent.click(getByTestId('toggle-btn'));
  
    expect(getByTestId('logout-link')).toBeVisible();
  });

  it('Navigates to the landing page when clicking on logout', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('toggle-btn'));
    fireEvent.click(getByTestId('logout-link'));

    expect(history.location.pathname).toBe('/home');
  });

  it('Clears local storage upon logging out', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('toggle-btn'));
    fireEvent.click(getByTestId('logout-link'));

    expect(localStorage.length).toEqual(0);
  });

  it('Calls dispatch to clear user when logging out', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );
    
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockedDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockedDispatch);

    fireEvent.click(getByTestId('toggle-btn'));
    fireEvent.click(getByTestId('logout-link'));

    expect(mockedDispatch).toHaveBeenCalled();
  });

  it('Navigates to the add post when clicking on add post', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId('post-btn'));

    expect(history.location.pathname).toBe('/newpost');
  });

  it('Shows tooltip when hovering over add post button', () => {
    const history = createMemoryHistory();
    const { getByTestId, container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Navbar/>
        </Router>
      </Provider>
    );

    fireEvent.mouseOver(getByTestId('post-btn'));
    expect(container).toHaveTextContent('Add a new post');
  });
});