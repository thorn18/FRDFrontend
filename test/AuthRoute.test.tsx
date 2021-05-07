import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent from '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";
import { Provider, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import store from '../src/store/store'
import decode from 'jwt-decode';
import UserService from "../src/services/userService";
import AuthRoute from '../src/components/AuthRoute'
import { HashRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

let mockValid = true;

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

jest.mock('jwt-decode', () => jest.fn(() => {
    if(mockValid) {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return {
            exp: tomorrow
        }
    } else {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return {
            exp: yesterday
        }
    }
}));

afterEach(cleanup);

beforeEach(() => {
    Storage.prototype.setItem = jest.fn(() => {
    });
    Storage.prototype.getItem = jest.fn(() => {
        return '';
    });

})
describe("Tests for Authenticated Route", () => {
    it("Test to make sure that If no token exists, decoded is not called on that token", () => {
        Storage.prototype.setItem = jest.fn(() => {
        });
        Storage.prototype.getItem = jest.fn(() => {
            return null;
        });
        const { getByTestId } = render(<HashRouter>< AuthRoute /></HashRouter>);
        expect(getByTestId('NoToken')).toBeVisible();
    })
    it("Test to make sure that If token exists, decoded is called on that token", () => {
        mockValid = true;
        const { getByTestId } = render(<HashRouter>< AuthRoute /></HashRouter>);
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
    })
    it("Test to make sure that If token exists, and it is expired, then it will rerout to login ", () => {
        mockValid = false;
        const { getByTestId } = render(<HashRouter>< AuthRoute /></HashRouter>);
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
        expect(getByTestId('TokenExpiredRedirect')).toBeVisible();
    })
    it("Test to make sure that if token exists, and it not expired, then it will call the route designated ", () => {
        mockValid = true;
        const { getByTestId } = render(<HashRouter>< AuthRoute /></HashRouter>);
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
        expect(getByTestId('TokenValidRedirect')).toBeVisible();
    })
})