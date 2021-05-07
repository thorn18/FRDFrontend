import React, { useState } from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LoginComponent, { Input } from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import { Provider } from "react-redux";

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}))

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn()
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn()
}));

jest.mock('jwt-decode', () => jest.fn());

//test variables
//declared here for scope reasons
let input: Input = { username: '', password: '' };
let hasUsername: boolean = false;
let hasPassword: boolean = false;
let userInteracted: boolean = false;
let passInteracted: boolean = false;

//mocked functions
//declared here for scope reasons
let setAState = jest.fn();
let handleSubmit = jest.fn();
let register = jest.fn();

//mocking the redux store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

beforeEach(() => {
    jest.clearAllMocks();

    handleSubmit = jest.fn();
    register = jest.fn();
    setAState = jest.fn();
    (useState as jest.Mock).mockImplementation((x) => [x, setAState]);

    (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });

    store = mockStore({
        postsState: {
            posts: [],
            loading: false,
            hasMoreItems: true
        },
        userState: {
            token: '',
            loggedIn: false
        }
    });

    input = { username: '', password: '' };
    hasUsername = false;
    hasPassword = false;
    userInteracted = false;
    passInteracted = false;
});

//this function mocks the implementation of useState in the order that it is called in LoginComponent lines 22-26
//run it if you want the component set up with some value of input, hasUsername, etc
//but NOT if you want to test that useState is being called properly
const setup = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn()])
        .mockImplementationOnce(() => [hasUsername, jest.fn()])
        .mockImplementationOnce(() => [hasPassword, jest.fn()])
        .mockImplementationOnce(() => [userInteracted, jest.fn()])
        .mockImplementationOnce(() => [passInteracted, jest.fn()]);
}

const setupWithFunctionality = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => input = x)])
        .mockImplementationOnce(() => [hasUsername, jest.fn().mockImplementation((x) => hasUsername = x)])
        .mockImplementationOnce(() => [hasPassword, jest.fn().mockImplementation((x) => hasPassword = x)])
        .mockImplementationOnce(() => [userInteracted, jest.fn().mockImplementation((x) => userInteracted = x)])
        .mockImplementationOnce(() => [passInteracted, jest.fn().mockImplementation((x) => passInteracted = x)]);
}

afterEach(cleanup);

describe('Tests for the Login Validation', () => {

    it('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginForm')).toBeVisible();
    });

    it('Should call useState with default value', () => {
        render(<Provider store={store}><LoginComponent /></Provider>);
        expect(useState).toHaveBeenCalledWith(input);
    });

    it('Username should change if event fires', () => {
        //need to test that setInput works
        setAState.mockImplementationOnce((x) => { input = x });
        (useState as jest.Mock).mockImplementation((x) => [input, setAState]);

        const { getByTestId, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);
        let username = getByTestId('username');
        const value = 'test';
        fireEvent.change(username, { target: { value: value } });

        expect(input.username).toBe(value);
        expect(useState).toHaveBeenCalled();
        expect(setAState).toHaveBeenCalledWith({ "password": "", "username": value });

        //normally, changing the state would rerender the component
        //unfortunately useState has been mocked, so we need a manual rerender
        rerender(<Provider store={store}><LoginComponent /></Provider>);
        expect((username as HTMLInputElement).value).toBe(value);
    });

    it('Password should change if event fires', () => {
        //need to test that setInput works
        setAState.mockImplementationOnce((x) => { input = x });
        (useState as jest.Mock).mockImplementation((x) => [input, setAState]);

        const { getByTestId, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);
        let password = getByTestId('password');
        const value = 'test';
        fireEvent.change(password, { target: { value: value } });

        expect(input.password).toBe(value);
        expect(useState).toHaveBeenCalled();
        expect(setAState).toHaveBeenCalledWith({ "password": value, "username": "" });

        //normally, changing the state would rerender the component
        //unfortunately useState has been mocked, so we need a manual rerender
        rerender(<Provider store={store}><LoginComponent /></Provider>);
        expect((password as HTMLInputElement).value).toBe(value);
    });

    it('Login button should be disabled if no input', () => {
        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    });

    it('Login button should be disabled if only username is input', () => {
        hasUsername = true;
        userInteracted = true;

        setup();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    });

    it('Login button should be disabled if only password is input', () => {
        hasPassword = true;
        passInteracted = true;

        setup();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    });

    it('Login button should be enabled if username and password both exist', () => {
        hasUsername = true;
        hasPassword = true;
        userInteracted = true;
        passInteracted = true;

        setup();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).not.toBeDisabled();
    });
});

describe('Tests for Login Component validation error message', () => {
    it('No error messages if no input and no interaction', () => {
        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if username has been interacted with and is not empty and password has not been interacted', () => {
        hasUsername = true;
        userInteracted = true;

        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if password has been interacted with and is not empty and username has not been interacted', () => {
        hasPassword = true;
        passInteracted = true;

        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if username and password have both been interacted with and are not empty', () => {
        hasUsername = true;
        hasPassword = true;
        userInteracted = true;
        passInteracted = true;

        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    //changed test name because it was not testing this
    //it.skip('Error messages if no input and interaction', () => {
    it('Can select username input box', () => {
        userInteracted = true;
        passInteracted = true;

        setup();

        render(<Provider store={store}><LoginComponent /></Provider>);

        userEvent.click(screen.getByPlaceholderText('Username'));
        expect(screen.getByPlaceholderText('Username')).toHaveFocus();
    });

    it('Username error message if username has been interacted with and is empty and password has not been interacted', () => {
        userInteracted = true;

        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).toHaveTextContent('* Username is required');
        expect(container).not.toHaveTextContent('* Password is required');
    });

    it('Password error message if password has been interacted with and is empty and username has not been interacted', () => {
        passInteracted = true;

        setup();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).toHaveTextContent('* Password is required');
    });
});

describe('Tests for Login Component validation error message using userEvent', () => {
    it('No error messages if no input and no interaction, error if interaction but no input', () => {

        setupWithFunctionality();
        const { getByTestId, container, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);

        //user types 't' as a username
        userEvent.type(screen.getByTestId('username'), 't');

        setupWithFunctionality();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(((getByTestId('username')) as HTMLInputElement).value).toBe('t');
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');

        //user deletes 't'
        userEvent.type(screen.getByTestId('username'), '{backspace}');
        setupWithFunctionality();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(screen.getByTestId('username')).toHaveValue('');
        expect(useState).toHaveBeenCalled();

        expect(container).toHaveTextContent('Username is required');
    });

    it('No error messages if no input and no interaction, error if interaction but no input', () => {

        setupWithFunctionality();
        const { getByTestId, container, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);

        //user types 't' as a username
        userEvent.type(screen.getByTestId('password'), 't');

        setupWithFunctionality();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(((getByTestId('password')) as HTMLInputElement).value).toBe('t');
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');

        //user deletes 't'
        userEvent.type(screen.getByTestId('password'), '{backspace}');
        setupWithFunctionality();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(screen.getByTestId('password')).toHaveValue('');
        expect(useState).toHaveBeenCalled();

        setupWithFunctionality();
        rerender(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).toHaveTextContent('Password is required');
    });
});