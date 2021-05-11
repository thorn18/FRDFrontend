import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from '../src/store/store';
import CreatePostComponent from '../src/views/CreatePost/CreatePost';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockPush,
    }),
}));

afterEach(cleanup);

describe('The Create Post Component test', () => {
    
    it('shows that the Create Post Form is visible', () => {
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

        it('is visible', ()=>{
            const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
            expect(getByTestId('cancelButton')).toBeVisible();
        })

        it('and when it is clicked, the user will go to /home.', () => {
            const history = createMemoryHistory();
            const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
            fireEvent.click(getByTestId('cancelButton'));
            expect(mockPush).toHaveBeenCalledWith('/home');
        })
    });

    it('shows that the Create Post Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('createPostButton')).toBeVisible();
    });
})