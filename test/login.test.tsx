import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import LoginComponent from  '../src/components/Login/LoginComponent'
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe('Tests for the Login Component', () => {
    it('Test to make sure that Login Button is visible', () => {
        const { getByTestId } = render(< LoginComponent/>);
        expect(getByTestId('loginForm')).toBeVisible();
    })
})