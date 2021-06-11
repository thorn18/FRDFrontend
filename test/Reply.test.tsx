import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyComponent from '../src/components/Reply/Reply'
import Reply from '../src/models/reply';
import { Provider, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

const testComment: Reply = {
    id: 'testId',
    username: 'testUser',
    content: 'bla bla bla',
    timestamp: new Date(),
    postId: 'testPostId'
};

(useSelector as jest.Mock).mockImplementationOnce(() => true)
    .mockImplementationOnce(() => 'aToken')
    .mockImplementationOnce(() => testComment);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store = mockStore({});

afterEach(cleanup);

describe('Tests for comment component', () => {
    test('that you can see the commenter\'s username', () => {
        const { getByTestId } = render(<Provider store={store}> <ReplyComponent reply={testComment} /> </Provider>);

        expect(getByTestId('commenter')).toBeVisible();
        expect(getByTestId('comment-content')).toBeVisible();
    });
});