import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from '../src/store/store';
import CreateReplyComponent from '../src/components/Reply/CreateReply'
import { post0, noProfilePic } from './testData';
import Post from '../src/models/post'

describe('Tests for Create Reply Component that', () => {

    it('will make sure that Create Reply Component is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
        expect(getByTestId('createReply')).toBeVisible();
    });

    describe('Input box tests that ', () => {
        // let input = 'test';
        // (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
        //     let newinput = input;

        //     input = newinput;
        // })])

        it('will make sure that input is visible', () => {
            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
            expect(getByTestId('createReplyInput')).toBeVisible();
        });

        it('can handle input', () => {
            const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
            let content = getByTestId('createReplyInput');
            let testInput = 'wow. such great photo. many like.'
            fireEvent.change(content, { target: { value: testInput } });
            //expect(input).toEqual(testInput);
        })
    })

    it('Test to make sure that button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <CreateReplyComponent post={post0}/> </Provider>);
        expect(getByTestId('createReplyButton')).toBeVisible();
    });
})