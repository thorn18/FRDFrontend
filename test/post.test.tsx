import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PostComponent from '../src/components/post/PostComponent';
import Post from '../src/models/post';
import { post0, noProfilePic } from './testData';

afterEach(cleanup);

const props: Post = post0

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

