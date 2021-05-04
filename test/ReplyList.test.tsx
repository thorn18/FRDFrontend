import React from 'react';
import { render, cleanup, getByTestId, fireEvent, getAllByTestId, act } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyList from '../src/components/Reply/ReplyList';
import Reply from '../src/models/reply';
import replyService from '../src/services/replyService';
import { post0, post1 } from './testData'
import { reply0, reply1, reply2, reply3, reply4, reply5, reply6, reply7, replyList0, replyList1 } from './testReplyData';
import Replies from '../src/models/replies';
import Post from '../src/models/post';
import PostComponent from '../src/components/Post/PostComponent';
import ReplyComponent from '../src/components/Reply/Reply';
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

    it('the button appears with View More Comments', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props} /></Provider>);
        expect(getByTestId('more-com-btn')).toHaveTextContent('View All Comments');
    })

    it('the button is disabled if hasNext is false', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props} /></Provider>);
        expect(getByTestId('more-com-btn')).toBeDisabled();
    })

    it('the button is enabled if hasNext is true', () => {
        const { container, getByTestId } = render(<Provider store={store}><ReplyList post={props1} /></Provider>);
        expect(getByTestId('more-com-btn')).not.toBeDisabled();
    })

    it('when the view more comments button is clicked, the ReplyService is called', () => {
        
        (useDispatch as jest.Mock).mockImplementation(() => {
            const dispatch = (x): void => {};
            return dispatch;
        });
            
        // the post component will render in the first five comments
        const { container, getByTestId, getAllByTestId } = render(<Provider store={store}><PostComponent post={props1} /></Provider>);
        replyService.getMoreReplies = jest.fn().mockResolvedValue(replyList1);
        fireEvent.click(getByTestId('more-com-btn'));
        //after jest clicks the button, then the mocked service runs
        expect(replyService.getMoreReplies).toHaveBeenCalledTimes(1);
        }
    )
    it.skip('the new comments are displayed', () => {

        // act(() => {
        //     render(<Provider store={store}><PostComponent post={props1}></PostComponent></Provider>)
        // })
        // const descendant = getAllByTestId('commenter')
        // the test has 8 replies
        // expect(descendant).toHaveLength(8)

        //create fake replies
        const fakeRepliesList = [
            reply0,
            reply1,
            reply7,
            reply6,
            reply5,
            reply4,
            reply3,
            reply2
        ]
        const fakeReplyComponents = fakeRepliesList.map((reply) => (<Provider store={store}><ReplyComponent reply={reply} key={reply.id} /></Provider>))
        //the test will see if it has the same fake replies
        //expect(descendant).toEqual(fakeRepliesList);
    })
})

