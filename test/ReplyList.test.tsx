import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyList from '../src/components/Reply/ReplyList';
import replyService from '../src/services/replyService';
import { post0, post1 } from './testData'
import {replyListA, replyListB } from './testReplyData';
import Post from '../src/models/post';
import PostComponent from '../src/components/Post/PostComponent';
import { Provider, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

afterEach(cleanup);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store;

//mock useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}));

const props: Post = post0
const props1: Post = post1

beforeEach(() => {
    store = mockStore({});
});

describe('', () => {

    it('the button is disabled if hasNext is false', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props} /></Provider>);
        expect(getByTestId('more-com-btn')).not.toBeVisible();
    })

    it('the button is enabled if hasNext is true', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
        expect(getByTestId('more-com-btn')).toBeEnabled();
    })

    it('when the "View more comments" button is clicked, the ReplyService is called', () => {

        (useDispatch as jest.Mock).mockImplementation(() => {
            const dispatch = (x): void => { };
            return dispatch;
        });

        // the post component will render the first five comments
        const { container, getByTestId, getAllByTestId, rerender } = render(<Provider store={store}><PostComponent post={props1} /></Provider>);
        replyService.getMoreReplies = jest.fn().mockResolvedValueOnce(replyListB);

        // the correct message will display before the button is pressed, 10 comments left.
        expect(getByTestId('more-com-btn')).toHaveTextContent('View more comments')

        // after jest clicks the button, then the mocked service runs
        fireEvent.click(getByTestId('more-com-btn'));
        expect(replyService.getMoreReplies).toHaveBeenCalledTimes(1);

        // the correct message will display before the button is pressed, 5 comments left.
        props1.comments.items = [...replyListA.items, ...replyListB.items]
        rerender(<ReplyList post={props1}></ReplyList>)
        expect(getByTestId('more-com-btn')).toHaveTextContent('View all comments')

    })
})

