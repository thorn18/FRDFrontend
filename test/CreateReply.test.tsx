import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import CreateReplyComponent from '../src/components/Reply/CreateReply'
import { post0, noProfilePic } from './testData';
import Post from '../src/models/post'
import * as fivePosts from './fivePosts.json';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

let input: string = '';
let error: boolean = false;

beforeEach(() => {
    store = mockStore({
        postsState: {
            posts: fivePosts.items,
            loading: false,
            hasMoreItems: true
        },
        userState: {
            username: 'Bob',
            token: 'aToken',
            loggedIn: true,
            error: undefined
        }
    });

    (useState as jest.Mock).mockImplementationOnce((x) => [input, jest.fn()])
        .mockImplementationOnce((x) => [error, jest.fn()]);

    (useSelector as jest.Mock).mockImplementationOnce((x) => 'aToken')
        .mockImplementationOnce((x) => 'Bob');
});

describe('Tests for Create Reply Component, when logged in, that', () => {

    it('will make sure that Create Reply Component is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
        expect(getByTestId('createReply')).toBeVisible();
    });

    it.skip('Test to make sure that button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
        expect(getByTestId('createReplyButton')).toBeVisible();
    });

    describe.skip('Input box tests that ', () => {
        let input = 'test';

        it('will make sure that input is visible', () => {
            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            expect(getByTestId('createReplyInput')).toBeVisible();
        });

        it('can handle input', () => {
            let testInput = 'wow. such great photo. many like.';
            (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
                input = testInput;
            })])

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });
            //expect(input).toEqual(testInput);
        })
    })


})