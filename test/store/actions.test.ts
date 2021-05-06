import * as actions from '../../src/store/actions';
import Post from '../../src/models/post';
import Replies from '../../src/models/replies';
import { replyList0 } from '../testReplyData';

describe('Tests for Redux actions to do with getting posts', () => {

    //actions: getting posts, got posts success, got posts failed

    test('should create an action with no payload', () => {
        const testAction = {
            type: actions.postActionTypes.gettingPosts
        }
        expect(actions.gettingPosts()).toEqual(testAction);
    });

    test('should create an action with the posts that it got via axios', () => {
        const testPosts: Post[] = [];
        const testAction = {
            type: actions.postActionTypes.gotPostsSuccess,
            payload: testPosts
        }
        expect(actions.gotPostsSuccess(testPosts)).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'oh no!';
        const testAction = {
            type: actions.postActionTypes.gotPostsFailed,
            payload: testError
        }
        expect(actions.gotPostsFailed(testError)).toEqual(testAction);
    });

});

describe('Tests for Redux actions to do with getting comments', () => {

    //actions: getting replies, got replies success, got replies failed

    test('should create an action with no payload', () => {
        const testAction = {
            type: actions.postActionTypes.gettingReplies
        }
        expect(actions.gettingReplies()).toEqual(testAction);
    });

    test('should create an action with the Replies object that it got via axios', () => {
        const testReplies: Replies = replyList0;
        const testAction = {
            type: actions.postActionTypes.gotRepliesSuccess,
            payload: testReplies
        }
        expect(actions.gotRepliesSuccess(testReplies)).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'oh no!';
        const testAction = {
            type: actions.postActionTypes.gotRepliesFailed,
            payload: testError
        }
        expect(actions.gotRepliesFailed(testError)).toEqual(testAction);
    });

});

describe('Tests for Redux actions to do with logging in you user', () => {
    //actions: getting replies, got replies success, got replies failed

    test('should create an action with token object that it got via axios', () => {
        const testToken = 'aToken';
        const testAction = {
            type: actions.userActionTypes.loginSuccess,
            payload: testToken
        }
        expect(actions.loginSuccess(testToken)).toEqual(testAction);
    });

     test('should create an action to logout without payload', () => {
        const testAction = {
            type: actions.userActionTypes.logout,
        }
        expect(actions.logoutUser()).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'Login failed message';
        const testAction = {
            type: actions.userActionTypes.loginError,
            payload: testError
        }
        expect(actions.loginError(testError)).toEqual(testAction);
    });
})