import React, {useState} from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent, {Input} from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/userService";

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('jwt-decode', () => jest.fn());

afterEach(cleanup);

describe('Tests for the Login Component', () => {

    let handleSubmit = jest.fn();
    let register = jest.fn();

    beforeEach(() => {
        handleSubmit = jest.fn();
        register = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
    });


    it('Test to make sure that Login Form is visible', () => {
        const { getByTestId } = render(< LoginComponent />);
        expect(getByTestId('loginForm')).toBeVisible();
    });
    it('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(< LoginComponent />);
        expect(getByTestId('loginbutton')).toBeVisible();
    });

    it('Test that clicking on loginbutton, the form submits', () => {
        const { getByTestId } = render(< LoginComponent />);

        expect(getByTestId('loginbutton')).toBeVisible();
        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('Test that onSubmit dispatches to UserService', () => {
        (useDispatch as jest.Mock).mockImplementation(() => {
            const dispatch = (x): void => { };
            return dispatch;
        });
        UserService.login = jest.fn().mockResolvedValue(200);

        let testFormData = {
            username: 'testUser',
            password: 'testPassword'
        }

        handleSubmit.mockImplementationOnce((x) => { x(testFormData); });

        const { getByTestId } = render(< LoginComponent />);

        expect(getByTestId('loginbutton')).toBeVisible();

        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledWith(testFormData.username, testFormData.password);
    });
})

describe('Tests for the Login component validation', () => {
    let setInput: (input: Input) => void;
    let setUsername: (hasUsername: boolean) => void;
    let setPassword: (hasPassword: boolean) => void;
    
    
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
        let hasUsername: boolean = false;
        let hasPassword: boolean = false;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        const {getByTestId} = render(<LoginComponent/>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it('Login button should be disabled if only username is input', () => {
        let hasUsername: boolean = true;
        let hasPassword: boolean = false;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        const {getByTestId} = render(<LoginComponent/>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it('Login button should be disabled if only password is input', () => {
        let hasUsername: boolean = false;
        let hasPassword: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        const {getByTestId} = render(<LoginComponent/>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it('Login button should be enabled if username and password both exist', () => {
        let hasUsername: boolean = true;
        let hasPassword: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        const {getByTestId} = render(<LoginComponent/>);
        expect(getByTestId('loginbutton')).not.toBeDisabled();
    })

})