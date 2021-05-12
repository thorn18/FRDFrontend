import React, { useState } from 'react';
import { render, cleanup, getByTestId, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PostComponent from '../src/components/Post/PostComponent';
import Post from '../src/models/post';
import { post0, noProfilePic } from './testData';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { replyList0 } from './testReplyData';


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));


afterEach(cleanup);
let mockshowMenu = false;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)
let store;

const props: Post = post0;
let mockSetShowMenu = jest.fn();
beforeEach(() => {
    mockSetShowMenu.mockClear();
    store = mockStore({});
    (useState as jest.Mock).mockImplementation(() => [mockshowMenu, mockSetShowMenu])
});

const setupNoLogin = () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => '')
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => '');
}

const setupLogin = () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => 'Bob')
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => 'aToken');
}

const setupLoginDifferentUser = () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => 'Billy')
        .mockImplementationOnce(() => true)
        .mockImplementationOnce(() => 'aToken');
}


describe('elements display correctly', () => {


    it('has an image', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props} /></Provider>);
        expect(container).toContainHTML('image');
    })

    it('has a description', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props} /></Provider>);
        expect(container).toHaveTextContent('My test post!');
    })

    it('has a number of likes', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props} /></Provider>);
        expect(container).toHaveTextContent('0');
    })

    it('has a username', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props} /></Provider>);
        expect(container).toHaveTextContent('Bob');
    })

    it('has a default profile picture if the user does not have one set', () => {
        const { container } = render(<Provider store={store}><PostComponent post={noProfilePic} /></Provider>);
        expect(container).toContainHTML('https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
    })

    it('has the profile picture of the user if one is provided', () => {
        const { container } = render(<Provider store={store}><PostComponent post={props} /></Provider>);
        expect(container).toContainHTML('profilePic');
    })

    it('displays all comments', () => {
        post0.comments = replyList0;
        const { getAllByTestId } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        const comments = getAllByTestId('commenter');
        expect(comments.length).toEqual(5);
    })
})

describe('Tests delete button visibility', () => {
    it(('Tests to make sure that when user is not logged in the container with the delete post button does not show up.'), () => {
        setupNoLogin();
        const { container } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        expect(container).not.toHaveTextContent('Delete Post');
    })

    it(('Tests to make sure that when user is logged in the container with the delete post button shows up.'), () => {
        setupLogin();
        const { getByTestId } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        expect(getByTestId('deleteButtonBox')).toBeVisible();
    })
    it(('Tests to make sure that when user is logged in but user is different than post then delete post button does NOT show up'), () => {
        setupLoginDifferentUser();
        const { container } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        expect(container).not.toHaveTextContent('Delete Post');
    })
    it(('Test to make sure that when delete container pressed, menu state changes'), () => {
        setupLogin();
        const { container,rerender,getByTestId } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        fireEvent.click(getByTestId('deleteButtonBox'));
        expect(mockSetShowMenu).toHaveBeenCalledWith(true);
    })
    it('Test that the delete button shoulder render when showMenu is true', () => {
        setupLogin();
        (useState as jest.Mock).mockReturnValue([true,mockSetShowMenu]);
        const { container,rerender,getByTestId } = render(<Provider store={store}><PostComponent post={post0} /></Provider>);
        expect(getByTestId('deleteButton')).toBeVisible();
    })
})