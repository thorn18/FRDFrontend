import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PostComponent from '../src/post/PostComponent';
import Post from '../src/models/post';

afterEach(cleanup);
const date = new Date();

const props: Post = {
    post: {
        id: '1',
        username: 'Bob',
        description: 'My test post!',
        timestamp: date,
        likes: 0,
        imageId: 'image'
    },
    user: {
        id: '',
        username: '',
        profileImage: ''
    },
    comments: []
}

describe('elements display correctly', () => {

    it('has an image', () => {
        const { container } = render(<PostComponent post={props}/>);
        expect(container).toContainHTML('image');
    })

    it('has a description', () => {
        const { container } = render(<PostComponent post={props}/>);
        expect(container).toHaveTextContent('My test post!');
    })

    it('has a number of likes', () => {
        const { container } = render(<PostComponent post={props}/>);
        expect(container).toHaveTextContent('0');
    })

});

