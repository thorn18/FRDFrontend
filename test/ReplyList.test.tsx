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
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';

//mock useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store: MockStoreEnhanced;

const props: Post = post0
const props1: Post = post1

beforeEach(() => {
    store = mockStore({});
});

afterEach(cleanup);

describe('When the ReplyList component gets rendered,', () => {

    it('the button is disabled if hasNext is false', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props} /></Provider>);
        expect(getByTestId('more-com-btn')).not.toBeVisible();
    })

    it('the button is enabled if hasNext is true', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
        expect(getByTestId('more-com-btn')).toBeEnabled();
    })

    describe('and when there are more than 5 comments left to display,', () => {
        it('the correct message "View More Comments" will display before the button is pressed;', () => {
            //because there are 10 comments left in the test data
            const { getByTestId } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
            replyService.getMoreReplies = jest.fn().mockResolvedValueOnce(replyListB);
            expect(getByTestId('more-com-btn')).toHaveTextContent('View more comments')
        })

        it('and after jest clicks the button, then the mocked service runs,', ()=>{
            (useDispatch as jest.Mock).mockImplementation(() => {
                const dispatch = (x): void => { };
                return dispatch;
            });
            const { getByTestId } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
            fireEvent.click(getByTestId('more-com-btn'));
            expect(replyService.getMoreReplies).toHaveBeenCalledTimes(1);
        })

        it('and the correct message "View All Comments" will display.', ()=>{
            //because 5 comments are left in the test data
            const { getByTestId, rerender } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
            props1.comments.items = [...replyListA.items, ...replyListB.items]
            rerender(<ReplyList post={props1}></ReplyList>)
            expect(getByTestId('more-com-btn')).toHaveTextContent('View all comments')
        })
    })
})

