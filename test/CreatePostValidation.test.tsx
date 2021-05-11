import React, { useState } from "react";
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';
import CreatePost from '../src/views/CreatePost/CreatePost';
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn()
}));

beforeEach(() => {
    jest.clearAllMocks();
})