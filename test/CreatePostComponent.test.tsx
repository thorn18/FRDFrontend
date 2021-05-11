import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from '../src/store/store';
import CreatePostComponent, { PostInput } from '../src/views/CreatePost/CreatePost';
import { useForm } from "react-hook-form";
import PostService from '../src/services/postService';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";

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

afterEach(cleanup);

describe('Tests for Create Post Component', () => {

    let handleSubmit = jest.fn();
    let register = jest.fn();

    let input: PostInput = { image: '', description: '' };

    const setupWithSetState = () => {
        (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
            let newInput = { ...input };
            if (x.image) {
                newInput.image = x.image;
            } else if (x.description) {
                newInput.description = x.description;
            }
            input = newInput;
        })])
    }

    beforeEach(() => {
        jest.clearAllMocks();

        handleSubmit = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
    })

    it('Test to make sure that Create Post Form is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('createPostForm')).toBeVisible();
    });

    it('shows that the Choose Image Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('chooseImageButton')).toBeVisible();
    });

    it('shows that the Post Description is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('postDescriptionInput')).toBeVisible();
    });

    describe('The Cancel Button tests will make sure that the Cancel Button', () => {

        it('is visible', () => {
            const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
            expect(getByTestId('cancelButton')).toBeVisible();
        })

        it('and when it is clicked, the user will go to /home.', () => {
            const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
            fireEvent.click(getByTestId('cancelButton'));
            expect(mockPush).toHaveBeenCalledWith('/home');
        })
    });

    it('shows that the Create Post Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('createPostButton')).toBeVisible();
    });

    it('Test that clicking create post button, the form submits', () => {
        setupWithSetState();
        handleSubmit.mockImplementationOnce((x) => { return null });
        const { getByTestId } = render(<Provider store={store}><CreatePostComponent /></Provider>)
        fireEvent.click(getByTestId('createPostButton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    })

    it('Test that onSubmit dispatches to PostService', () => {
        let dispatch = jest.fn();
        // dispatch.mockImplementation((x): void => {
        //     return;
        // });
        // (useDispatch as jest.Mock).mockImplementation(() => {
        //     return dispatch;
        // })

        setupWithSetState();

        PostService.createPost = jest.fn().mockResolvedValue(200);
        
        let testFormData = {
            image: 'testImage',
            description: 'testDescription'
        }

        handleSubmit.mockImplementation((x) => { x() });
        const history = createMemoryHistory();

        const { getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <CreatePostComponent />
                </Router>
            </Provider>);
        
        let description = getByTestId('description');
        fireEvent.change(description, {target: {value: testFormData.description}});
        expect(input).toEqual(testFormData);

        fireEvent.click(getByTestId('createPostButton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(PostService.createPost).toHaveBeenCalledTimes(1);
        expect(PostService.createPost).toHaveBeenCalledWith(testFormData.image, testFormData.description);

        expect(mockPush).toHaveBeenCalledWith('/home');
    })
})