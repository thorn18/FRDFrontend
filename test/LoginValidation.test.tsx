import React, { useState } from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LoginComponent, { Input } from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (mockvalue) => [mockvalue, (value) => {
        mockvalue = value;
    }]
}))

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

let setInput: (input: Input) => void;
let setUsername: (hasUsername: boolean) => void;
let setPassword: (hasPassword: boolean) => void;
let setUI: (userInteracted: boolean) => void;
let setPI: (passInteracted: boolean) => void;


let input: Input = { username: '', password: '' };
let hasUsername: boolean = false;
let hasPassword: boolean = false;
let userInteracted: boolean = false;
let passInteracted: boolean = false;

afterEach(cleanup);

let handleSubmit = jest.fn();
let register = jest.fn();

beforeEach(() => {
    let mockInput = { username: '', password: '' };
    let mockHasUsername = false;
    let mockHasPassword = false;
    let mockUserInteracted = false;
    let mockPassInteracted = false;

    setInput = jest.fn();
    setUsername = jest.fn();
    setPassword = jest.fn();
    setUI = jest.fn();
    setPI = jest.fn();

    (useState as jest.Mock).mockImplementation(() => ({
        input: mockInput,
        setInput,
        hasUsername: mockHasUsername,
        setUsername,
        hasPassword: mockHasPassword,
        setPassword,
        userInteracted: mockUserInteracted,
        setUI,
        passInteracted: mockPassInteracted,
        setPI,
    }));

    handleSubmit = jest.fn();
    register = jest.fn();
    (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
})

afterEach(cleanup);

describe('Tests for the Login Validation', () => {
    it.skip('Test to make sure that Login Button is visible', () => {
        (useState as jest.Mock).mockImplementation(() => [input, setInput]);
        const { getByTestId } = render(< LoginComponent />);
        expect(getByTestId('loginForm')).toBeVisible();
    })
    it.skip('Should call useState with default value', () => {
        (useState as jest.Mock).mockImplementation(() => [input, setInput]);
        render(<LoginComponent />);
        expect(useState).toHaveBeenCalledWith(input);
    })

    it.skip('Username should change if event fires', () => {
        (useState as jest.Mock).mockImplementation(() => [input, setInput]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        const { getByTestId } = render(<LoginComponent />);
        let username = getByTestId('username');
        const value = 'test'
        fireEvent.change(username, { target: { value: value } });
        expect((username as HTMLInputElement).value).toBe(value);
        expect(useState).toHaveBeenCalled();
    })

    it.skip('Password should change if event fires', () => {
        (useState as jest.Mock).mockImplementation(() => [input, setInput]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        const { getByTestId } = render(<LoginComponent />);
        let password = getByTestId('password');
        const value = 'test'
        fireEvent.change(password, { target: { value: value } });
        expect((password as HTMLInputElement).value).toBe(value)
        expect(useState).toHaveBeenCalled();
    })

    it.skip('Login button should be disabled if no input', () => {
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { getByTestId } = render(<LoginComponent />);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it.skip('Login button should be disabled if only username is input', () => {
        let hasUsername: boolean = true;
        let userInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { getByTestId } = render(<LoginComponent />);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it.skip('Login button should be disabled if only password is input', () => {
        let hasPassword: boolean = true;
        let passInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        const { getByTestId } = render(<LoginComponent />);
        expect(getByTestId('loginbutton')).toBeDisabled();
    })

    it.skip('Login button should be enabled if username and password both exist', () => {
        let hasUsername: boolean = true;
        let hasPassword: boolean = true;
        let userInteracted: boolean = true;
        let passInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { getByTestId } = render(<LoginComponent />);
        expect(getByTestId('loginbutton')).not.toBeDisabled();
    })
})

describe('Tests for Login Component validation error message', () => {
    it.skip('No error messages if no input and no interraction', () => {
        let hasUsername: boolean = false;
        let hasPassword: boolean = false;
        let userInteracted: boolean = false;
        let passInteracted: boolean = false;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { container } = render(<LoginComponent />);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    })

    it.skip('No error messages if username has been interracted with and is not empty and password has not been interracted', () => {
        let hasUsername: boolean = true;
        let hasPassword: boolean = false;
        let userInteracted: boolean = true;
        let passInteracted: boolean = false;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { container } = render(<LoginComponent />);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    })

    it.skip('No error messages if password has been interracted with and is not empty and username has not been interracted', () => {
        let hasUsername: boolean = false;
        let hasPassword: boolean = true;
        let userInteracted: boolean = false;
        let passInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        const { container } = render(<LoginComponent />);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    })

    it.skip('No error messages if username and password have both been interracted with and are not empty', () => {
        let hasUsername: boolean = true;
        let hasPassword: boolean = true;
        let userInteracted: boolean = true;
        let passInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { container } = render(<LoginComponent />);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    })

    it('Error messages if no input and interraction', () => {
        const {getByTestId } = render(< LoginComponent />);
        const value = 'test';

        userEvent.click(screen.getByPlaceholderText('Username'));
        expect(screen.getByPlaceholderText('Username')).toHaveFocus();
        userEvent.type(screen.getByPlaceholderText('Username'), "Something");
        userEvent.clear(screen.getByPlaceholderText('Username'));
        
        expect(getByTestId("usernameWarning")).toBeVisible();

        // userEvent.clear(screen.getByRole('textbox', { name: /Username:/i }));
        // // userEvent.clear(password);
        // expect(screen.getByRole('textbox', { name: /Username:/i })).toHaveValue('');
        // expect(useState).toHaveBeenCalled();
        // // expect(userWarn).toBeVisible();
        // // expect(getByText(/required/)).toBeInTheDocument();
        // expect(setUsername).toHaveBeenCalled()

    })

    it.skip('Username error message if username has been interracted with and is empty and password has not been interracted', () => {
        let hasUsername: boolean = false;
        let hasPassword: boolean = false;
        let userInteracted: boolean = true;
        let passInteracted: boolean = false;
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        const { container } = render(<LoginComponent />);
        expect(container).toHaveTextContent('* Username is required');
        expect(container).not.toHaveTextContent('* Password is required');
    })

    it.skip('Password error message if password has been interracted with and is empty and username has not been interracted', () => {
        let hasUsername: boolean = false;
        let hasPassword: boolean = false;
        let userInteracted: boolean = false;
        let passInteracted: boolean = true;
        (useState as jest.Mock).mockImplementation(() => [passInteracted, setPI]);
        (useState as jest.Mock).mockImplementation(() => [hasPassword, setPassword]);
        (useState as jest.Mock).mockImplementation(() => [hasUsername, setUsername]);
        (useState as jest.Mock).mockImplementation(() => [userInteracted, setUI]);
        const { container } = render(<LoginComponent />);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).toHaveTextContent('* Password is required');
    })
})