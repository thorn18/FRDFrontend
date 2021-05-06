import React, { useState } from 'react'
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from "../src/App";
import PaginationList from '../src/components/Post/PaginationList';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import userService from '../src/services/userService';
import { Provider, useDispatch } from 'react-redux';
import postService from '../src/services/postService';
import PostComponent from '../src/components/Post/PostComponent';
import * as posts from './fivePosts.json'

jest.mock('../src/components/Post/PostComponent', () => 'PostComponent');


afterEach(cleanup);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store;

//mock useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}));

beforeEach(() => {
    store = mockStore({
        postsState: {
            posts: [],
            loading: false,
            hasMoreItems: true
        }
    });
});

describe("Tests list of posts", () => {
    it('expects dispatch to be called on render', () => {
        (useDispatch as jest.Mock).mockImplementation(() => {
            const dispatch = (x): void => { };
            return dispatch;
        });
        postService.getAllPosts = jest.fn();
        
        render(<Provider store={store}><PaginationList /></Provider>);
        expect(postService.getAllPosts).toBeCalledTimes(1);
    })

    it('Callback is called when bottom of page is reached', () => {
        (useDispatch as jest.Mock).mockImplementation(() => {
            const dispatch = (x): void => { };
            return dispatch;
        });
        postService.getAllPosts = jest.fn();
        const getByTestId = render(<Provider store={store}><PaginationList /></Provider>);
        fireEvent.scroll(window, { target: { scrollY: 100 } });
        expect(postService.getAllPosts).toBeCalledTimes(2);
    });



});

