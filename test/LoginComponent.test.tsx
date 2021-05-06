import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/userService";
import { useHistory } from "react-router-dom";

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(),
}));


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
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

    it.skip('Test to make sure that Login Form is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginForm')).toBeVisible();
    });

    it.skip('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);
        expect(getByTestId('loginbutton')).toBeVisible();
    });

    it.skip('Test that clicking on loginbutton, the form submits', () => {
        handleSubmit.mockImplementationOnce((x) => { return null });

        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);

        expect(getByTestId('loginbutton')).toBeVisible();
        fireEvent.click(getByTestId('loginbutton'));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('Test that onSubmit dispatches to UserService', async () => {
        //temporary
        const consoleSpy = jest.spyOn(console, 'log');

        const dispatch = jest.fn();
        dispatch.mockImplementation((x): void => { });
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatch;
        });

        // const push = jest.fn();
        // push.mockImplementation((x): void => { });
        // (useHistory as jest.Mock).mockImplementation(() => {
        //     return push;
        // });

        //useSelector((state: AppState) => state.userState.token);
        (useSelector as jest.Mock).mockImplementation((x) => {
            return 'testToken';
        });
        UserService.login = jest.fn().mockResolvedValue(200);

        let testFormData = {
            username: 'testUser',
            password: 'testPassword'
        }
        
        // x is onSubmit
        handleSubmit.mockImplementation((x) => { x(testFormData); });
        //(useHistory().push as jest.Mock).mockImplementationOnce((x) => null);

        const { getByTestId } = render(<Provider store={store}> <LoginComponent /> </Provider>);

        expect(getByTestId('loginbutton')).toBeVisible();

        fireEvent.click(getByTestId('loginbutton'));

        await expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledTimes(1);
        expect(UserService.login).toHaveBeenCalledWith(testFormData.username, testFormData.password);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith('after dispatch token=testToken');
        // expect useHistory to have been called
        expect(useHistory().push).toHaveBeenCalledWith('/home'));
    });
})