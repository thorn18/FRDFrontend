import React, { useState } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useSelector, useDispatch } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import CreateReplyComponent from '../src/components/Reply/CreateReply';
import { post0, post1 } from './testData';
import replyService from "../src/services/replyService";
import { NewReply } from "../src/models/reply";
import userEvent from "@testing-library/user-event";

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

let input: string = '';
const setInput = jest.fn();
let error: boolean = false;
const setError = jest.fn();

let dispatch = jest.fn();

let mockToken = 'aToken';
let mockUsername = 'Bob';

const setMocks = () => {
    setInput.mockImplementation((x) => input = x);
    setError.mockImplementation((x) => error = x);
    (useState as jest.Mock).mockImplementationOnce((x) => [input, setInput])
        .mockImplementationOnce((x) => [error, setError]);

    (useSelector as jest.Mock).mockImplementationOnce((x) => mockToken)
        .mockImplementationOnce((x) => mockUsername);

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);

    replyService.createReply = jest.fn();
}

beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({
        postsState: {
            posts: [post0, post1],
            loading: false,
            hasMoreItems: true
        },
        userState: {
            username: mockUsername,
            token: mockToken,
            loggedIn: true,
            error: undefined
        }
    });

    setMocks();
});

afterEach(cleanup);

describe('Tests for Create Reply Component, when logged in, that', () => {

    it('will make sure that Create Reply Component is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
        expect(getByTestId('createReply')).toBeVisible();
    });

    it('Test to make sure that button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
        expect(getByTestId('createReplyButton')).toBeVisible();
    });

    describe('Input box tests that ', () => {

        it('will make sure that input is visible', () => {
            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            expect(getByTestId('createReplyInput')).toBeVisible();
        });

        it('changing input box content calls setInput (to change input state)', () => {
            let testInput = 't';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            // fireEvent.change(content, { target: { value: testInput } });
            userEvent.type(content, testInput);
            expect(setInput).toHaveBeenCalledWith(testInput);
            expect(input).toEqual(testInput);
            userEvent.type(content, '{backspace}');
        });

        it('changing input box content calls setError (to make error state false)', () => {
            error = true;

            setMocks();

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, 't');
            expect(setError).toHaveBeenCalledWith(false);
            expect(error).toBe(false);
            userEvent.type(content, '{backspace}');
        });

        it('changing input box content to empty calls setError', () => {
            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');
        
            //fireEvent.change(content, { target: { value: testInput } });
            userEvent.type(content, 't');
            expect(setError).toHaveBeenCalledWith(false);
            input = 't';
            setMocks();
            rerender(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);

            userEvent.type(content, '{backspace}');
            
            // setMocks();
            // rerender(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);

            expect(setInput).toHaveBeenCalledWith('');
            expect(setError).toHaveBeenCalledWith(true);
            expect(error).toEqual(true);
        });

        it('changing input box content to white space calls setError', () => {
            let testInput = ' ';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            // fireEvent.change(content, { target: { value: testInput } });
            userEvent.type(content, testInput);
            expect(setError).toHaveBeenCalledWith(true);
            expect(error).toEqual(true);
        });

        it('changing input box content to white space displays error message', () => {
            let testInput = ' ';

            const { getByTestId, container } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            // fireEvent.change(content, { target: { value: testInput } });
            userEvent.type(content, testInput);
            expect(container).toHaveTextContent('* Comment is required');
        });
    });

    describe('Submit button tests that ', () => {
        it('when the button is clicked, dispatch is called', () => {
            let testInput = 'wow. such great photo. many like.';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });
            fireEvent.click(getByTestId('createReplyButton'));

            expect(dispatch).toHaveBeenCalledTimes(1);
        });

        it('when the button is clicked, replyService is called', () => {
            let testInput = 'wow. such great photo. many like.';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });
            fireEvent.click(getByTestId('createReplyButton'));

            expect(replyService.createReply).toHaveBeenCalledTimes(1);
        });

        it('when the button is clicked, replyService is called with the correct content', () => {
            let testInput = 'wow. such great photo. many like.';
            let newReply: NewReply = {
                username: 'Bob',
                content: testInput,
                postId: post0.post.id
            }

            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });

            input = testInput;
            setMocks();
            rerender(<CreateReplyComponent post={post0} />);
            fireEvent.click(getByTestId('createReplyButton'));

            expect(replyService.createReply).toHaveBeenCalledWith(newReply, 'aToken', true);
        });

        it('when the button is clicked, the input is cleared', () => {
            let testInput = 'wow. such great photo. many like.';

            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });

            input = testInput;
            setMocks();
            rerender(<CreateReplyComponent post={post0} />);
            fireEvent.click(getByTestId('createReplyButton'));

            expect(setInput).toHaveBeenLastCalledWith('');
        });

        it('if no one is logged in (how did they see this component?), nothing is dispatched', () => {
            store = mockStore({
                postsState: {
                    posts: [post0, post1],
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

            mockToken = '';
            mockUsername = '';

            let testInput = 'wow. such great photo. many like.';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            fireEvent.change(content, { target: { value: testInput } });
            fireEvent.click(getByTestId('createReplyButton'));

            expect(replyService.createReply).not.toHaveBeenCalled();
            mockToken = 'aToken';
            mockUsername = 'Bob';
        });
    });
});