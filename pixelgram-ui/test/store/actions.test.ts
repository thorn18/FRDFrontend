import * as actions from '../../src/store/actions';

describe('Tests for Redux actions', () => {

    //actions: getting posts, got posts success, got posts failed
    //might be it for the current user stories?
    //in the future, will need add post, add comment, login, etc

    test('should create an action with no payload', () => {
        const testPosts = [{}];
        const testAction = {
            type: actions.postActionTypes.gettingPosts
        }
        expect(actions.gettingPosts()).toEqual(testPosts);
    });

    test('should create an action with the posts that it got via axios', () => {
        const testPosts = [{}];
        const testAction = {
            type: actions.postActionTypes.gotPostsSuccess,
            payload: testPosts
        }
        expect(actions.gotPostsSuccess(testPosts)).toEqual(testPosts);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = '';
        const testAction = {
            type: actions.postActionTypes.gotPostsFailed,
            payload: testError
        }
        expect(actions.gotPostsFailed(testError)).toEqual(testError);
    });

});