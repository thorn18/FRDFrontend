import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AuthRoute from '../src/components/AuthRoute'
import { Route, Router, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { createMemoryHistory } from 'history';

let mockValid = true;
let history: any;

jest.mock('jwt-decode', () => jest.fn(() => {
    if (mockValid) {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        let tomorrowNum: number = Number(tomorrow);
        tomorrowNum = tomorrowNum / 1000;
        return {
            exp: tomorrowNum
        }
    } else {
        let today = new Date();
        let yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        let yesterdayNum: number = Number(yesterday);
        yesterdayNum = yesterdayNum / 1000;
        return {
            exp: yesterdayNum
        }
    }
}));

afterEach(cleanup);

beforeEach(() => {
    jest.clearAllMocks();

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn().mockImplementation((x) => {
        return '';
    });
    history = createMemoryHistory();
});

describe("Tests for Authenticated Route", () => {
    it("Test to make sure that If no token exists, we go to login", () => {
        Storage.prototype.getItem = jest.fn().mockImplementation((x) => {
            return null;
        });

        render(
            <Router history={history}>
                <Switch>
                    < Route exact path='/' />
                    < AuthRoute exact path='/testpath' />
                    < Route exact path='/login' />
                </Switch>
            </Router>
        );
        expect(history.location.pathname).toBe('/');

        //attempt to visit restricted location
        history.push('/testpath');
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).not.toHaveBeenCalled();
        expect(history.location.pathname).toBe('/login');
    });

    it("Test to make sure that If token exists, decoded is called on that token", () => {
        mockValid = true;
        render(
            <Router history={history}>
                <Switch>
                    < Route exact path='/' />
                    < AuthRoute exact path='/testpath' />
                    < Route exact path='/login' />
                </Switch>
            </Router>
        );
        expect(history.location.pathname).toBe('/');

        //attempt to visit restricted location
        history.push('/testpath');
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
    });

    it("Test to make sure that If token exists, and it is expired, then it will reroute to login ", () => {
        mockValid = false;
        render(
            <Router history={history}>
                <Switch>
                    < Route exact path='/' />
                    < AuthRoute exact path='/testpath' />
                    < Route exact path='/login' />
                </Switch>
            </Router>
        );
        expect(history.location.pathname).toBe('/');

        //attempt to visit restricted location
        history.push('/testpath');
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/login');
    });

    it("Test to make sure that if token exists, and it not expired, then it will call the route designated ", () => {
        mockValid = true;
        render(
            <Router history={history}>
                <Switch>
                    < Route exact path='/' />
                    < AuthRoute exact path='/testpath' />
                    < Route exact path='/login' />
                </Switch>
            </Router>
        );
        expect(history.location.pathname).toBe('/');

        //attempt to visit restricted location
        history.push('/testpath');
        expect(Storage.prototype.getItem).toHaveBeenCalled();
        expect(jwtDecode).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/testpath');
    });
});