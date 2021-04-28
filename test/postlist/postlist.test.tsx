import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react';
import PostList from '../../src/post/postlist';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe("Tests for postlist, which is a list inclusion of all posts on the page.", () => {
    
    it('Basic Test', () => {
        const {getByTestId} = render(<PostList/>);
        expect(getByTestId('testone')).toHaveTextContent('Hello World');
    })

    it("Test2" , () => {
        const {getByTestId} = render(<PostList/>);
        expect(getByTestId('button')).toHaveTextContent("0");
    })
})