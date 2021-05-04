import React, { useState } from 'react'
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import App from "../src/App";
import PaginationList from '../src/components/Post/PaginationList';
import {Provider} from 'react-redux';
import store from '../src/store/store';

jest.mock('react', ()=>({...jest.requireActual('react'), useState:jest.fn()}));
jest.mock('../src/services/postService', () => ({getAllPosts: jest.fn()}));
jest.mock('../src/components/Post/PostComponent', () => () => 'PostComponent');


afterEach(cleanup);


describe("Tests list of posts", () => {
    it ('expects useState to be called', ()=>{
        /* (useState as jest.Mock).mockImplementation(()=>Promise.resolve([]));
        render(<PaginationList/>);
        expect(useState).toBeCalledTimes(1); */
    })

    it('Callback is called when bottom of page is reached', ()=>{

        const postService = require('../src/services/postService');
       
        

        const {container} = render(<Provider store = {store}> <PaginationList/></Provider>)
        const scrollContainer = getByTestId(container, "scrollContainer");
        fireEvent.scroll(scrollContainer, {target:{scrollY:100}});
        expect(postService.getAllPosts).toHaveBeenCalledTimes(2);

        
        /* const mockCallback = jest.fn();
        const { container } = render(<App />);
        const scrollBox = getByTestId(container, "scrollBox");
        useInfiniteScroll(mockCallback);
        fireEvent.scroll(scrollBox, {target:{scrollY:100}})
        expect(mockCallback).toHaveBeenCalledTimes(1); */

    });



});