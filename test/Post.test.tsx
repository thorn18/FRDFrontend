import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PostComponent from '../src/components/Post/PostComponent';
import Post from '../src/models/post';
import { post0, noProfilePic } from './testData';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { replyList0 } from './testReplyData';

afterEach(cleanup);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store;

const props: Post = post0;

beforeEach(() => {
    store = mockStore({});
});

describe('elements display correctly', () => {

    it('has an image', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props}/></Provider>);
        expect(container).toContainHTML('image');
    })

    it('has a description', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props}/></Provider>);
        expect(container).toHaveTextContent('My test post!');
    })

    it('has a number of likes', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props}/></Provider>);
        expect(container).toHaveTextContent('0');
    })
    
    it('has a username', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props}/></Provider>);
        expect(container).toHaveTextContent('Bob');
    })

    it('has a default profile picture if the user does not have one set', () => {
        const { container } = render(<Provider store={store}><PostComponent post={noProfilePic}/></Provider>);
        expect(container).toContainHTML('https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
    })
    
    it('has the profile picture of the user if one is provided', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props}/></Provider>);
        expect(container).toContainHTML('profilePic');
    })

    it('displays all comments', () => {
        post0.comments = replyList0;
        const { getAllByTestId } = render(<Provider store={store}><PostComponent post={post0}/></Provider>);
        const comments = getAllByTestId('commenter');
        expect(comments.length).toEqual(5);
    })
});

