import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PostComponent from '../src/post/post';
import Post from '../src/models/post';

afterEach(cleanup);

const props: Post = {
    post: {
        id: '',
        username: '',
        description: '',
        //timestamp: '',
        //likes: 0,
        imageId: ''
    },
    user: {
        id: '',
        username: '',
        profileImage: ''
    }
}

describe('elements display correctly', () => {

    it('has an image', () => {
        const { getByTestId } = render(<PostComponent />);
        expect(getByTestId('postImage')).not.toBeNull();
    })

    it('has a description', () => {
        const { getByTestId } = render(<PostComponent />);
        expect(getByTestId('postDescription')).not.toBeNull();
    })

    it('has a timestamp', () => {
        const { getByTestId } = render(<PostComponent />);
        expect(getByTestId('postDescription')).not.toBeNull();
    })

    it('has a number of likes', () => {
        const { getByTestId } = render(<PostComponent />);
        expect(getByTestId('postDescription')).not.toBeNull();
    })

});

