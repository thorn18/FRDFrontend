import React, { useState } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useSelector, useDispatch } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import CreateReplyComponent from '../src/components/Reply/CreateReply';
import { post0, post1, post2 } from './testData';
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
let userError: boolean = false;
const setUserError = jest.fn();
let limit: boolean = false;
const setLimit = jest.fn();

let dispatch = jest.fn();

let mockServerError = Error('401 unauthorized.');
let mockToken = 'aToken';
let mockUsername = 'Bob';

const setMocks = () => {
    setInput.mockImplementation((x) => input = x);
    setUserError.mockImplementation((x) => userError = x);
    setLimit.mockImplementation((x) => limit = x);
    (useState as jest.Mock).mockImplementationOnce((x) => [input, setInput])
        .mockImplementationOnce((x) => [userError, setUserError])
        .mockImplementationOnce((x) => [limit, setLimit]);

    (useSelector as jest.Mock).mockImplementationOnce((x) => post2)
        .mockImplementationOnce((x) => mockToken)
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
        setMocks();
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

            userEvent.type(content, testInput);
            expect(setInput).toHaveBeenCalledWith(testInput);
            expect(input).toEqual(testInput);
            userEvent.type(content, '{backspace}');
        });

        it('changing input box content calls setUserError (to make error state false)', () => {
            userError = true;

            setMocks();

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, 't');
            expect(setUserError).toHaveBeenCalledWith(false);
            expect(userError).toBe(false);
            userEvent.type(content, '{backspace}');
        });

        it('changing input box content to empty calls setUserError', () => {
            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, 't');
            expect(setUserError).toHaveBeenCalledWith(false);
            input = 't';
            setMocks();
            rerender(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);

            userEvent.type(content, '{backspace}');

            expect(setInput).toHaveBeenCalledWith('');
            expect(setUserError).toHaveBeenCalledWith(true);
            expect(userError).toEqual(true);
        });

        it('changing input box content to white space calls setUserError', () => {
            let testInput = ' ';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, testInput);
            expect(setUserError).toHaveBeenCalledWith(true);
            expect(userError).toEqual(true);
        });

        it('changing input box content to white space displays error message', () => {
            let testInput = ' ';

            const { getByTestId, container } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, testInput);
            expect(container).toHaveTextContent('* Comment is required');
        });
    });

    describe('Submit button tests that', () => {
        it('when the button is clicked, dispatch is called', () => {
            let testInput = 'wow. such great photo. many like.';

            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, testInput);
            setMocks();
            rerender(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            fireEvent.click(getByTestId('createReplyButton'));

            expect(dispatch).toHaveBeenCalledTimes(1);
        });

        it('when the button is clicked, replyService is called', () => {
            let testInput = 'wow. such great photo. many like.';

            const { getByTestId, rerender } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
            let content = getByTestId('createReplyInput');

            userEvent.type(content, testInput);
            setMocks();
            rerender(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
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

            expect(replyService.createReply).toHaveBeenCalledWith(newReply, 'aToken', false);
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

        it('if there is a serverError, then correct error message is displayed', () => {
            store = mockStore({
                postsState: {
                    posts: [post2, post1],
                    loading: false,
                    hasMoreItems: true,
                },
                userState: {
                    username: 'Bob',
                    token: 'aToken',
                    loggedIn: true,
                    error: undefined
                }
            });

            mockToken = 'aToken';
            mockUsername = 'Bob';

            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post2} /> </Provider>);
            let content = getByTestId('serverError');
            expect(content).toHaveTextContent('* The server encountered an error. Please try again')
        })

        it('if no one is logged in, nothing is dispatched', () => {
            // they shouldn't be able to see the component, but just in case they can see it, 
            // this test makes sure that they can't
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

describe('tests the input box character limit', ()=>{
    //this describe is unnested because it needs to be independent in order to work.
    it('changing input box content to more than 120 characters displays error message', () => {
        let testInput = 'i wonder why people write really long comments. after people read more than two sentences in a comment, more often than not, people wont change at all.';

        const { getByTestId, container } = render(<Provider store={store}> <CreateReplyComponent post={post0} /> </Provider>);
        let content = getByTestId('createReplyInput');

        //fireEvent.change(content, { target: { value: testInput } });
        userEvent.paste(content, testInput);
        expect(limit).toEqual(true);
        userEvent.type(content,'{selectall}{backspace}');
    });
})