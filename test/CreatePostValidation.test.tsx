import React, { useState } from "react";
import configureMockStore from 'redux-mock-store';
import { Provider, useDispatch } from 'react-redux';
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import PostService from '../src/services/postService';
import { Router, useHistory } from "react-router-dom";
import { createMemoryHistory } from 'history';
import CreatePost from "../src/views/CreatePost/CreatePost";
import thunk from "redux-thunk";

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockPush,
    }),
}));

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;


afterEach(cleanup);

describe('Tests for Form Input', () => {

    let input = '';
    let selectedFile = undefined;

    const setupWithSetState = () => {
        (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
            let newInput = input;
            newInput = x;
            input = newInput;
        })]).mockImplementationOnce(() => [selectedFile, jest.fn().mockImplementationOnce((x) => {
            let newFile = selectedFile;
            newFile = x;
            selectedFile = newFile;
        })])
    }

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore({
            postsState: {
                posts: [],
                loading: false,
                hasMoreItems: true
            },
            userState: {
                token: '',
                loggedIn: false,
                username: ''
            }
        });
    })

    it('Test that clicking create post button, the form submits', () => {
        setupWithSetState();
        const { getByTestId } = render(<Provider store={store}><CreatePost /></Provider>)
        fireEvent.click(getByTestId('createPostButton'));
        expect(mockPush).toHaveBeenCalledWith('/home');
    })

    it('Test that onSubmit dispatches to PostService', () => {
        let dispatch = jest.fn();
        dispatch.mockImplementation((x): void => {
            return;
        });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        })

        setupWithSetState();

        PostService.createPost = jest.fn().mockResolvedValue(200);

        const { getByTestId } = render(
            <Provider store={store}>
                <CreatePost />
            </Provider>);

        fireEvent.click(getByTestId('createPostButton'));
        expect(PostService.createPost).toHaveBeenCalledTimes(1);
    })
})