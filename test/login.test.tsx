import React, {useState} from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent, {Input} from  '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";

let setInput: (input: Input) => void;


let input: Input = {username: '', password: ''};

jest.mock('react', ()=> ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

beforeEach(() => {
    //jest.requireActual('react');

    input = {username: '', password: ''};

    setInput = jest.fn();

 (useState as jest.Mock).mockImplementation(() => [input, setInput]);
})

afterEach(cleanup);

describe('Tests for the Login Component', () => {
    it('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(< LoginComponent/>);
        expect(getByTestId('loginForm')).toBeVisible();
    })
    it('Should call useState with default value', () => {
        render(<LoginComponent/>);
        expect(useState).toHaveBeenCalledWith(input);
    })

    it('Username should change if event fires', () => {
        const {getByTestId} = render(<LoginComponent/>);
        let username = getByTestId('username');
        const value = 'test'
        const testInput: Input = {username: value, password: ''}
        fireEvent.change(username, {target: {value: value}});
        expect(setInput).toHaveBeenCalledWith(testInput)
    })

    it('Password should change if event fires', () => {
        const {getByTestId} = render(<LoginComponent/>);
        let password = getByTestId('password');
        const value = 'test'
        const testInput: Input = {username: '', password: value}
        fireEvent.change(password, {target: {value: value}});
        expect(setInput).toHaveBeenCalledWith(testInput)
    })

    it('Login button should be disabled if no input', () => {
        const {getByTestId} = render(<LoginComponent/>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

})