import React, { useState } from "react";
import configureMockStore from 'redux-mock-store';
import { Provider, useDispatch } from 'react-redux';
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';
import { screen, render, fireEvent, cleanup, getByDisplayValue } from "@testing-library/react";
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

let input = '';
let selectedFile = undefined;
let descriptionInteracted: boolean = false;
let imgInteracted: boolean = false;
let createErr: boolean = false;

let setAState = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

const setupNoSetState = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn()])
        .mockImplementationOnce(() => [selectedFile, jest.fn()])
        .mockImplementationOnce(() => [descriptionInteracted, jest.fn()])
        .mockImplementationOnce(() => [imgInteracted, jest.fn()])
        .mockImplementationOnce(() => [createErr, jest.fn()]);
}

const setupWithSetState = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
        let newInput = input;
        newInput = x;
        input = newInput;
    })]).mockImplementationOnce(() => [selectedFile, jest.fn().mockImplementationOnce((x) => {
        let newFile = selectedFile;
        newFile = x;
        selectedFile = newFile;
    })]).mockImplementationOnce(() => [descriptionInteracted, jest.fn().mockImplementation((x) => descriptionInteracted = x)])
    .mockImplementationOnce(() => [imgInteracted, jest.fn().mockImplementation((x) => imgInteracted = x)])
    .mockImplementationOnce(() => [createErr, jest.fn().mockImplementation((x) => createErr = x)]);
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

afterEach(cleanup);

describe('Tests for Form Input', () => {

    input = 'hello';
    selectedFile = !undefined;

    it('Tests that clicking create post button will redirect to home on sucess', () => {
        let dispatch = jest.fn();
        dispatch.mockImplementation((x): void => {
            return;
        });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        })
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

    it('changes description if event fires', () => {
        setAState.mockImplementationOnce((x) => { input = x });
        (useState as jest.Mock).mockImplementation((x) => [input, setAState]);

        const { getByTestId } = render(<Provider store={store}><CreatePost /></Provider>)
        let description = getByTestId('postDescriptionInput');
        const value = 'test';
        fireEvent.change(description, { target: { value: value } });

        expect(input).toBe(value);
        expect(useState).toHaveBeenCalled();
        expect(setAState).toHaveBeenCalledWith(value);
    })

    // it('changes image if event fires', () => {
    //     setAState.mockImplementationOnce((x) => {selectedFile = x});
    //     (useState as jest.Mock).mockImplementation((x) => [selectedFile, setAState]);

    //     const {getByTestId} = render(<Provider store={store}><CreatePost/></Provider>)
    //     let image = getByTestId('chooseImageButton');
    //     const img = '';
    //     fireEvent.change(image, {target: {value: img}});

    //     expect(selectedFile).toBe(img);
    //     expect(useState).toHaveBeenCalled();
    //     expect(setAState).toHaveBeenCalledWith(img);
    // })
})

describe('Tests for Form Validation', () => {
    
    it('should have the create post button disabled if there is no input', () => {
        
        input = '';
        selectedFile = undefined;

        setupNoSetState();
        
        const { getByTestId } = render(<Provider store={store}><CreatePost /></Provider>);
        expect(getByTestId('createPostButton')).toBeDisabled();
    })

    it('displays no error messages if there is no input and no interaction', () => {
        const {container} = render(<Provider store={store}><CreatePost/></Provider>)
        expect(container).not.toHaveTextContent('Image is required');
        expect(container).not.toHaveTextContent('Description is required');
    })

    it('displays no error message if both fields are filled', () => {
        input = 'hello';
        selectedFile = !undefined;

        const {container} = render(<Provider store={store}><CreatePost/></Provider>)
        expect(container).not.toHaveTextContent('Image is required');
        expect(container).not.toHaveTextContent('Description is required');
    })

    it('displays error message if description has been interacted with but is empty', () => {
        input = '';
        descriptionInteracted = true;

        setupNoSetState();

        const {container} = render(<Provider store={store}><CreatePost/></Provider>)
        expect(container).toHaveTextContent('Description is required');
    })

    it('displays error message if image has been interacted with but is empty', () => {
        selectedFile = undefined;
        imgInteracted = true;

        setupNoSetState();

        const {container} = render(<Provider store={store}><CreatePost/></Provider>)
        expect(container).toHaveTextContent('Image is required');
    })

})