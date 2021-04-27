import * as actions from '../../src/store/actions';
import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {afterEach, describe, it, expect} from '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('Tests for Redux actions', () => {

    //actions: getting posts, got posts success, got posts failed
    //might be it for the current user stories?
    //in the future, will need add post, add comment, login, etc

    it('should create an action with no payload', () => {
        const testPosts = [{}];
        const testAction = {
            type: actions.GETTING_POSTS
        }
        expect(actions.gettingPosts()).toEqual(testPosts);
    });

    it('should create an action with the posts that it got via axios', () => {
        const testPosts = [{}];
        const testAction = {
            type: actions.GOT_POSTS_SUCCESS,
            payload: testPosts
        }
        expect(actions.gotPostsSuccess(testPosts)).toEqual(testPosts);
    });

    it('should create an action with the error that it got via axios', () => {
        const testError = '';
        const testAction = {
            type: actions.GOT_POSTS_FAILED,
            payload: testError
        }
        expect(actions.gotPostsFailed(testError)).toEqual(testError);
    });

});