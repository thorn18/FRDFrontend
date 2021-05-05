import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/UserService";

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