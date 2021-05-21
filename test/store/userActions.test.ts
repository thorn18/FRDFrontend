import * as actions from '../../src/store/userActions';

describe('Tests for Redux actions to do with logging in and out a user', () => {
    //actions: getting replies, got replies success, got replies failed
    test('should create an action with token object that it got via axios', () => {
        const token = 'aToken';
        const username = 'aUser';

        const testAction = {
            type: actions.userActionTypes.loginSuccess,
            payload: { username, token }
        };
        expect(actions.loginSuccess(username, token)).toEqual(testAction);
    });

    test('should create an action to logout without payload', () => {
        const testAction = {
            type: actions.userActionTypes.logout,
        };
        expect(actions.logoutUser()).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'Login failed message';
        const testAction = {
            type: actions.userActionTypes.loginError,
            payload: testError
        };
        expect(actions.loginError(testError)).toEqual(testAction);
    });
});
