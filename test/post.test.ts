import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-libary/jest-dom/extend-expect';
import PostComponent from '../src/post/post';
import { expect } from '@jest/globals';
import { it } from 'jest-circus';

afterEach(cleanup);

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