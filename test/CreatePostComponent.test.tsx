import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from '../src/store/store';
import CreatePostComponent from '../src/views/CreatePost/CreatePost';

afterEach(cleanup);

describe('Tests for Create Post Component', () => {
    
    it('Test to make sure that Create Post Form is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('createPostForm')).toBeVisible();
    });

    it('Test to make sure that Cancel Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('cancelButton')).toBeVisible();
    });

    it('Test to make sure that Create Post Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('createPostButton')).toBeVisible();
    });

    it('Test to make sure that Post Description is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('postDescriptionInput')).toBeVisible();
    });
    
    it('Test to make sure that Choose Image Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreatePostComponent /> </Provider>);
        expect(getByTestId('chooseImageButton')).toBeVisible();
    });
})