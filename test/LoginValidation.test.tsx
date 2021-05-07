import React, { useState } from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LoginComponent, { Input } from '../src/components/Login/LoginComponent'
<<<<<<< HEAD
=======
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff
import "@testing-library/jest-dom/extend-expect";
import { useForm } from 'react-hook-form';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
<<<<<<< HEAD
    useState: (mockvalue) => [mockvalue, (value) => {
        mockvalue = value;
    }]
=======
    useState: jest.fn()
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff
}))

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
<<<<<<< HEAD
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
=======
    useForm: jest.fn()
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn()
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff
}));

jest.mock('jwt-decode', () => jest.fn());

<<<<<<< HEAD
let setInput: (input: Input) => void;
let setUsername: (hasUsername: boolean) => void;
let setPassword: (hasPassword: boolean) => void;
let setUI: (userInteracted: boolean) => void;
let setPI: (passInteracted: boolean) => void;


=======
//test variables
//declared here for scope reasons
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff
let input: Input = { username: '', password: '' };
let hasUsername: boolean = false;
let hasPassword: boolean = false;
let userInteracted: boolean = false;
let passInteracted: boolean = false;

<<<<<<< HEAD
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
=======
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
const setupNoSetState = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn()])
        .mockImplementationOnce(() => [hasUsername, jest.fn()])
        .mockImplementationOnce(() => [hasPassword, jest.fn()])
        .mockImplementationOnce(() => [userInteracted, jest.fn()])
        .mockImplementationOnce(() => [passInteracted, jest.fn()]);
}

const setupWithSetState = () => {
    (useState as jest.Mock).mockImplementationOnce(() => [input, jest.fn().mockImplementation((x) => input = x)])
        .mockImplementationOnce(() => [hasUsername, jest.fn().mockImplementation((x) => hasUsername = x)])
        .mockImplementationOnce(() => [hasPassword, jest.fn().mockImplementation((x) => hasPassword = x)])
        .mockImplementationOnce(() => [userInteracted, jest.fn().mockImplementation((x) => userInteracted = x)])
        .mockImplementationOnce(() => [passInteracted, jest.fn().mockImplementation((x) => passInteracted = x)]);
}
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff

afterEach(cleanup);

describe('Tests for the Login Validation', () => {
<<<<<<< HEAD
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
=======

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

        setupNoSetState();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    });

    it('Login button should be disabled if only password is input', () => {
        hasPassword = true;
        passInteracted = true;

        setupNoSetState();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).toBeDisabled();
    });

    it('Login button should be enabled if username and password both exist', () => {
        hasUsername = true;
        hasPassword = true;
        userInteracted = true;
        passInteracted = true;

        setupNoSetState();

        const { getByTestId } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(getByTestId('loginbutton')).not.toBeDisabled();
    });
});

describe('Tests for Login Component validation error message', () => {
    it('No error messages if no input and no interaction', () => {
        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if username has been interacted with and is not empty and password has not been interacted', () => {
        hasUsername = true;
        userInteracted = true;

        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if password has been interacted with and is not empty and username has not been interacted', () => {
        hasPassword = true;
        passInteracted = true;

        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    it('No error messages if username and password have both been interacted with and are not empty', () => {
        hasUsername = true;
        hasPassword = true;
        userInteracted = true;
        passInteracted = true;

        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');
    });

    //changed test name because it was not testing this
    //it.skip('Error messages if no input and interaction', () => {
    it('Can select username input box', () => {
        userInteracted = true;
        passInteracted = true;

        setupNoSetState();

        render(<Provider store={store}><LoginComponent /></Provider>);

        userEvent.click(screen.getByPlaceholderText('Username'));
        expect(screen.getByPlaceholderText('Username')).toHaveFocus();
    });

    it('Username error message if username has been interacted with and is empty and password has not been interacted', () => {
        userInteracted = true;

        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).toHaveTextContent('* Username is required');
        expect(container).not.toHaveTextContent('* Password is required');
    });

    it('Password error message if password has been interacted with and is empty and username has not been interacted', () => {
        passInteracted = true;

        setupNoSetState();

        const { container } = render(<Provider store={store}><LoginComponent /></Provider>);
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).toHaveTextContent('* Password is required');
    });
});

describe('Tests for Login Component validation error message using userEvent', () => {
    it('No error messages if no input and no interaction, error if interaction but no input', () => {

        setupWithSetState();
        const { getByTestId, container, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);

        //user types 't' as a username
        userEvent.type(screen.getByTestId('username'), 't');

        setupWithSetState();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(((getByTestId('username')) as HTMLInputElement).value).toBe('t');
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');

        //user deletes 't'
        userEvent.type(screen.getByTestId('username'), '{backspace}');
        setupWithSetState();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(screen.getByTestId('username')).toHaveValue('');
        expect(useState).toHaveBeenCalled();

        expect(container).toHaveTextContent('Username is required');
    });

    it('No error messages if no input and no interaction, error if interaction but no input', () => {

        setupWithSetState();
        const { getByTestId, container, rerender } = render(<Provider store={store}><LoginComponent /></Provider>);

        //user types 't' as a username
        userEvent.type(screen.getByTestId('password'), 't');

        setupWithSetState();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(((getByTestId('password')) as HTMLInputElement).value).toBe('t');
        expect(container).not.toHaveTextContent('Username is required');
        expect(container).not.toHaveTextContent('Password is required');

        //user deletes 't'
        userEvent.type(screen.getByTestId('password'), '{backspace}');
        setupWithSetState();
        rerender(<Provider store={store}><LoginComponent /></Provider>);

        expect(screen.getByTestId('password')).toHaveValue('');
        expect(useState).toHaveBeenCalled();

        expect(container).toHaveTextContent('Password is required');
    });
});
>>>>>>> fc64915d3fc51b4bc9f802fbd8f397bf3bb724ff
