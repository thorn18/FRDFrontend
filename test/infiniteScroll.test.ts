import React from 'react'
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react';
import useInfiniteScroll from '../src/useInfiniteScroll';
import '@testing-library/jest-dom/extend-expect';
import App from "../src/App";

afterEach(cleanup);


describe("Tests for infinte scroll hook", () => {
    it('Callback is called when bottom of page is reached', ()=>{
        const mockCallback = jest.fn();
        const { container } = render(<App />);
        const scrollBox = getByTestId(container, "scrollBox");
        useInfiniteScroll(mockCallback);
        fireEvent.scroll(scrollBox, {target:{scrollY:100}})
        expect(mockCallback).toHaveBeenCalledTimes(1);

    });



});