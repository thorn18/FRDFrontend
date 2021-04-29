import React from 'react'
import {render, cleanup, fireEvent, getByTestId, getAllByTestId} from '@testing-library/react';
import Post from '../../src/models/post';
import PostList from '../../src/post/PostList';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import store from '../../src/store/store';

afterEach(cleanup);

describe("render PostList, which is a list that includes all posts on the page.", () => {
    
    it('PostList creates map of PostComponents', () => {
        jest.mock('../../src/post/PostComponent', () => () => 'PostComponent');
        const {container, getAllByTestId} = render(<Provider store = {store}> <PostList/></Provider>)
        const descendant = getAllByTestId('postListMain')[0]
        expect(container).toContainElement(descendant)
    })
    
})