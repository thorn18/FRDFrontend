import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent, { Input } from '../src/views/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/userService";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));
jest.mock('jwt-decode', () => jest.fn());
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockPush,
    }),
}));

afterEach(cleanup);

describe('Tests for the Login Component', () => {

    let handleSubmit = jest.fn();
    let register = jest.fn();

    //test variables
    //declared here for scope reasons
    let input: Input = { username: '', password: '' };
    let hasUsername: boolean = false;
    let hasPassword: boolean = false;
    let userInteracted: boolean = false;
    let passInteracted: boolean = false;

    const setupWithSetState = () => {
        (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => {
            let newinput = { ...input };
            if (x.username) {
                newinput.username = x.username;
            } else if (x.password) {
                newinput.password = x.password;
            }
            input = newinput;
        })])
            .mockImplementationOnce(() => [hasUsername, jest.fn().mockImplementation((x) => hasUsername = x)])
            .mockImplementationOnce(() => [hasPassword, jest.fn().mockImplementation((x) => hasPassword = x)])
            .mockImplementationOnce(() => [userInteracted, jest.fn().mockImplementation((x) => userInteracted = x)])
            .mockImplementationOnce(() => [passInteracted, jest.fn().mockImplementation((x) => passInteracted = x)]);
    }

    beforeEach(() => {
        jest.clearAllMocks();

        handleSubmit = jest.fn();
        register = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
    });

    it('Test to make sure that Login Form is visible', () => {
        setupWithSetState();
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginForm')).toBeVisible();
    });

    it('Test to make sure that Login Button is visible', () => {
        setupWithSetState();
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginbutton')).toBeVisible();
    });

    it('Test that clicking on loginbutton, the form submits', () => {
        setupWithSetState();
        handleSubmit.mockImplementationOnce((x) => { return null });
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginbutton')).toBeVisible();
        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('Test that onSubmit dispatches to UserService', async () => {

        let dispatch = jest.fn();
        let token = '';
        dispatch.mockImplementation((x): void => {
            token = 'testToken';
            return;
        });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        });
        (useSelector as jest.Mock).mockImplementation((x) => {
            return token;
        });

        setupWithSetState();

        UserService.login = jest.fn().mockResolvedValue(200);
        let testFormData = {
            username: 'testUser',
            password: 'testPassword'
        }
        // x is onSubmit
        handleSubmit.mockImplementation((x) => { x() });
        const history = createMemoryHistory();
        const { getByTestId, rerender } = render(
            <Provider store={store}>
                <Router history={history}>
                    <LoginComponent />
                </Router>
            </Provider>
        );
        expect(getByTestId('loginbutton')).toBeVisible();

        let username = getByTestId('username');
        fireEvent.change(username, { target: { value: testFormData.username } });

        let password = getByTestId('password');
        fireEvent.change(password, { target: { value: testFormData.password } });
        expect(input).toEqual(testFormData);

        //RESET MOCKS
        dispatch = jest.fn().mockImplementation((x): void => {
            token = 'testToken';
            return;
        });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        });
        (useSelector as jest.Mock).mockImplementation((x) => {
            return token;
        });
        setupWithSetState();
        UserService.login = jest.fn().mockResolvedValue(200);
        handleSubmit = jest.fn().mockImplementation((x) => { x() });
        register = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
        rerender(<LoginComponent />);

        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledWith(testFormData.username, testFormData.password);
        expect(dispatch).toHaveBeenCalledTimes(1);

        //RESET MOCKS
        dispatch = jest.fn().mockImplementation((x): void => {
            token = 'testToken';
            return;
        });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        });
        (useSelector as jest.Mock).mockImplementation((x) => {
            return token;
        });
        setupWithSetState();
        UserService.login = jest.fn().mockResolvedValue(200);
        handleSubmit = jest.fn().mockImplementation((x) => { x() });
        register = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => { return { register, handleSubmit } });
        rerender(<LoginComponent />);
        expect(mockPush).toHaveBeenCalledWith('/home');
    });
});