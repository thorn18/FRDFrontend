import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyComponent from '../src/components/Reply/Reply'
import Reply from '../src/models/reply';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { post2 } from './testData';
import { reply0 } from './testReplyData';
import replyService from '../src/services/replyService';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

const testComment: Reply = {
    id: 'testId',
    username: 'testUser',
    content: 'bla bla bla',
    timestamp: new Date(),
    postId: 'testPostId',
    error: Error('unauthorized')
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store = mockStore({
    postsState: {
        posts: post2,
        loading: false,
        hasMoreItems: true
    }
});

let dispatch = jest.fn();


beforeEach(() => {
    (useSelector as jest.Mock).mockImplementationOnce(() => true)
        .mockImplementationOnce(() => 'aToken')
        .mockImplementationOnce(() => reply0);
    
    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);

    replyService.createReply = jest.fn();
})

afterEach(cleanup);

describe('Tests for comment component', () => {
    test('that you can see the commenter\'s username', () => {
        const { getByTestId } = render(<Provider store={store}> <ReplyComponent reply={testComment} /> </Provider>);

        expect(getByTestId('commenter')).toBeVisible();
        expect(getByTestId('comment-content')).toBeVisible();
    });

    it('that clicking the resend reply calls the service', () => {
        const { getByTestId } = render(<Provider store={store}> <ReplyComponent reply={reply0} /> </Provider>);
        expect(getByTestId('resendComment')).toBeVisible();
        fireEvent.click(getByTestId('resendComment'));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(replyService.createReply).toHaveBeenCalledTimes(1)
    })
});