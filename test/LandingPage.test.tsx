import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { Provider, useDispatch, useSelector } from "react-redux";
import LandingPage from "../src/views/LandingPage/LandingPage";
import PaginationList from '../src/components/Post/PaginationList';
import { resetPostState } from '../src/store/postActions';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));
jest.mock('../src/components/Post/PaginationList', () => () => {
    return <div data-testid='paginationList' />
});

//mocking the redux store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

let mockDeleted = false;
let mockError: any = undefined;
let mockLoading = false;

let mockedDispatch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();

});

afterEach(cleanup);

function setupStoreAndDispatch() {
    store = mockStore({
        postsState: {
            posts: [],
            loading: mockLoading,
            hasMoreItems: true,
            deleted: mockDeleted,
            error: mockError
        },
        userState: {
            token: '',
            loggedIn: false
        }
    });

    mockedDispatch.mockImplementationOnce((x) => console.log('dispatch called'));
    (useDispatch as jest.Mock).mockImplementation(() => mockedDispatch);
    (useSelector as jest.Mock).mockImplementationOnce((x) => mockDeleted)
        .mockImplementationOnce((x) => mockLoading)
        .mockImplementationOnce((x) => mockError);
}

describe('Tests for LandingPage rendering list of posts', () => {
    test('That pagination list is displayed', () => {
        mockDeleted = false;
        mockError = undefined;
        mockLoading = false;
        setupStoreAndDispatch();
        const { getByTestId } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(getByTestId('paginationList')).toBeVisible();
    });
});

describe('Tests for modal for deleting a post', () => {
    test('That no modal appears when nothing has been deleted, ie deleted is false in store', () => {
        mockDeleted = false;
        mockError = undefined;
        mockLoading = false;
        setupStoreAndDispatch();
        const { container } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(container).not.toHaveTextContent('Deleting...');
        expect(container).not.toHaveTextContent('There is an error');
        expect(container).not.toHaveTextContent('Post deleted');
    });

    test('That a modal appears when something is being deleted, ie deleted is true and loading true in store', () => {
        mockDeleted = true;
        mockError = undefined;
        mockLoading = true;
        setupStoreAndDispatch();
        const { getByTestId } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(getByTestId('deletingMessage')).toBeVisible();
    });

    test('That a modal appears when something has been successfully deleted, ie deleted is true and loading false in store', () => {
        mockDeleted = true;
        mockError = undefined;
        mockLoading = false;
        setupStoreAndDispatch();
        const { getByTestId } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(getByTestId('deletedSuccessMessage')).toBeVisible();
    });

    test('That a modal appears when something has been unsuccessfully deleted, ie deleted is true and loading false and error is in store', () => {
        mockDeleted = true;
        mockError = 'oh no';
        mockLoading = false;
        setupStoreAndDispatch();
        const { getByTestId } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(getByTestId('deletedFailedMessage')).toBeVisible();
    });

    test('That we dispatch a call to the store when Close Modal button is clicked', () => {
        mockDeleted = true;
        mockError = undefined;
        mockLoading = false;
        setupStoreAndDispatch();
        const { getByTestId } = render(<Provider store={store}><LandingPage /></Provider>);

        expect(getByTestId('deletedSuccessMessage')).toBeVisible();
        expect(getByTestId('closeModalButton')).toBeVisible();

        //this button should send a dispatch to reset the posts state
        fireEvent.click(getByTestId('closeModalButton'));
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(resetPostState());
        
    });
});