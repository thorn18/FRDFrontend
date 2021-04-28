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
        id: '1',
        username: 'Bob',
        profileImage: 'profilePic'
    },
    comments: []
}

const noProfilePic: Post = {
    post: {
        id: '1',
        username: 'Bob',
        description: 'My test post!',
        timestamp: date,
        likes: 0,
        imageId: 'image'
    },
    user: {
        id: '1',
        username: 'Bob',
        profileImage: null
    },
    comments: []
}

describe.skip('elements display correctly', () => {

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
    
    it('has a username', () => {
        const { container } = render(<PostComponent post={props}/>);
        expect(container).toHaveTextContent('Bob');
    })

    it('has a default profile picture if the user does not have one set', () => {
        const { container } = render(<PostComponent post={noProfilePic}/>);
        expect(container).toContainHTML('https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
    })
    
    it('has the profile picture of the user if one is provided', () => {
        const { container } = render(<PostComponent post={props}/>);
        expect(container).toContainHTML('profilePic');
    })
});

