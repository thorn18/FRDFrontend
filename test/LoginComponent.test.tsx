import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/userService";
import { Router, useHistory } from "react-router-dom";
import { createMemoryHistory } from 'history';

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
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
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginForm')).toBeVisible();
    });

    it('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginbutton')).toBeVisible();
    });

    it('Test that clicking on loginbutton, the form submits', () => {
        handleSubmit.mockImplementationOnce((x) => { return null });
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginbutton')).toBeVisible();
        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    describe('tests for submitting form', () => {
        const dispatch = jest.fn();

        let testFormData = {
            username: 'testUser',
            password: 'testPassword'
        }

        const history = createMemoryHistory();

        beforeEach(() => {
            dispatch.mockImplementation((x): void => { });
            (useDispatch as jest.Mock).mockImplementation(() => {
                return dispatch;
            });
            (useSelector as jest.Mock).mockImplementation((x) => {
                return 'testToken';
            });
            UserService.login = jest.fn().mockResolvedValue(200);
            handleSubmit.mockImplementation((x) => { x(testFormData); });
        });

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('Test that clicking the submit dispatches to UserService', async () => {

            const { getByTestId } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <LoginComponent />
                    </Router>
                </Provider>
            );
            expect(getByTestId('loginbutton')).toBeVisible();
            fireEvent.click(getByTestId('loginbutton'));
            await expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(UserService.login).toHaveBeenCalledTimes(1);
            expect(UserService.login).toHaveBeenCalledWith(testFormData.username, testFormData.password);
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(history.location.pathname).toBe('/home');
        });

        it('Test that pressing enter dispatches to UserService', async () => {

            const { getByTestId } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <LoginComponent />
                    </Router>
                </Provider>
            );
            expect(getByTestId('loginbutton')).toBeVisible();
            const input = getByTestId('loginFormForm');
            fireEvent.keyDown(input, { key: "Enter", code: 13, charCode: 13 });
            await expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(UserService.login).toHaveBeenCalledTimes(1);
            expect(UserService.login).toHaveBeenCalledWith(testFormData.username, testFormData.password);
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(history.location.pathname).toBe('/home');
        });
    });
});

