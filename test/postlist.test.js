import React from 'react'
import { render, cleanup, fireEvent } from '@testing-libarary/react';
//import TestEvent from './/';
import '@testing-library/jest-dom/extend-expect';
import axios, { axiosMock } from 'axios';

afterEach(cleanup);
jest.mock('axios');

describe("Tests for postlist, which is a list inclusion of all posts on the page.", () => {
    it('List should render 5 items by default.', () => {

    });

    it('List updates when bottom of page is reached and there are more posts to load (atleast 5 more posts can be loaded', () => {
        //aleast 10 entries in fakePosts
        const fakePosts = [];
        const { getByTestId } = render(<PostList />);
        //if length doesn't work, use getAllByTestId
        expect(getByTestId('post-list').length).toBe(5);
        fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
        expect(getByTestId('post-list').length).toBe(10);
    });

    it('List updates when bottom of page is reached and there are more posts to load (less than 5 more posts can be loaded', () => {
        //aleast 10 entries in fakePosts
        const fakePosts = [];
        const { getByTestId } = render(<PostList />);
        //if length doesn't work, use getAllByTestId
        expect(getByTestId('post-list').length).toBe(5);
        fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
        expect(getByTestId('post-list').length).toBe(8);
    });

    it('List updates when bottom of page is reached and there are no more posts to load', () => {
        //fakeposts length should be 4
        const fakePosts = [];
        const { getByTestId } = render(<PostList />);
        //if length doesn't work, use getAllByTestId
        expect(getByTestId('post-list').length).toBe(4);
        fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
        expect(getByTestId('post-list').length).toBe(4);
    });

    it('When bottom of page is reached there is a call to axios', () => {
        const fakePosts = [];
        const { getByTestId } = render(<PostList />);

        axiosMock.get.mockResultValueOnce({
            Data: {
                Post: [
                    // A postMessage,
                    // Another post
                ]
            }
        });

        fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
        //Maybe more depending on how the code ends up, does one call retur 5 posts or are we doing 5 calls to get 5 posts
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
    });

    it('Message displays when an error occurs',()=>{
        //aleast 10 entries in fakePosts
        const fakePosts = [];
        const {getByTestId}=render(<PostList/>);
        //if length doesn't work, use getAllByTestId
        expect(getByTestId('post-list').length).toBe(5);
        axiosMock.get.mockResultValueOnce(error);
        //something happens?
        expect(getByTestId('error-message')).toHaveAttribute('visible');
        
    });
    
    it('Error Message does not displays when no error occurs',()=>{
        const fakePosts = [];
        const {getByTestId}=render(<PostList/>);

        axiosMock.get.mockResultValueOnce({
            Data: {
                Post: [
                    // A postMessage,
                    // Another post
                ]
            }
        });

        fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } });
        //something happens?
        expect(getByTestId('error-message')).not.toHaveAttribute('visible');
        
    });


});