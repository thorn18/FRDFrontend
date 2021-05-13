import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from '../src/store/store';
import CreateReplyComponent from '../src/components/Reply/CreateReply'
import { post0, noProfilePic } from './testData';
import Post from '../src/models/post'

describe('Tests for Create Reply Component', () => {

    it('Test to make sure that Create Reply Component is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
        expect(getByTestId('createReply')).toBeVisible();
    });

    it('Test to make sure that input is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
        expect(getByTestId('createReplyInput')).toBeVisible();
    });

    it('Test to make sure that button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
        expect(getByTestId('createReplyButton')).toBeVisible();
    });
})