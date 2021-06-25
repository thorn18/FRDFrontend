import * as actions from '../../src/store/postActions';
import Post, { NewPost } from '../../src/models/post';
import Replies from '../../src/models/replies';
import { replyList0 } from '../testReplyData';
import { post0, newPost } from '../testData';
import { reply0 } from '../testReplyData';

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

describe('Tests for Redux actions to do with deleting posts', () => {

    //actions: deleting post, deleted post success, deleted post failed
    const testPostId = 'testPostId';

    test('should create an action with no payload', () => {
        const testAction = {
            type: actions.postActionTypes.deletingPost
        }
        expect(actions.deletingPost()).toEqual(testAction);
    });

    test('should create an action with the post id to be deleted', () => {

        const testAction = {
            type: actions.postActionTypes.deletedPostSuccess,
            payload: testPostId
        }
        expect(actions.deletedPostSuccess(testPostId)).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'oh no!';
        const testAction = {
            type: actions.postActionTypes.deletedPostFailed,
            payload: testError
        }
        expect(actions.deletedPostFailed(testError)).toEqual(testAction);
    });

});

describe('Tests for Redux actions to do with deleting posts', () => {

    //actions: deleting post, deleted post success, deleted post failed
    const testPostId = 'testPostId';

    test('should create an action with no payload', () => {
        const testAction = {
            type: actions.postActionTypes.deletingPost
        }
        expect(actions.deletingPost()).toEqual(testAction);
    });

    test('should create an action with the post id to be deleted', () => {

        const testAction = {
            type: actions.postActionTypes.deletedPostSuccess,
            payload: testPostId
        }
        expect(actions.deletedPostSuccess(testPostId)).toEqual(testAction);
    });

    test('should create an action with the error that it got via axios', () => {
        const testError = 'oh no!';
        const testAction = {
            type: actions.postActionTypes.deletedPostFailed,
            payload: testError
        }
        expect(actions.deletedPostFailed(testError)).toEqual(testAction);
    });

});

describe('Test for Redux actions for creating a new post', () => {

    test('should create an action of creatingPost there should be no payload', () => {
        const testAction = {
            type: actions.postActionTypes.creatingPost,
        }
        expect(actions.creatingPost()).toEqual(testAction);
    });

    test('should create an action of createPostSuccess with a status code as a payload', () => {
        const testCode: number = 201;
        const testAction = {
            type: actions.postActionTypes.createPostSuccess,
            payload: 201
        }
        expect(actions.createPostSuccess(testCode)).toEqual(testAction);
    });

    test('should create action for createPostFailed with error as a payload', () => {
        const testError = 'there is an error!';
        const testAction = {
            type: actions.postActionTypes.createPostFailed,
            payload: testError
        }
        expect(actions.createPostFailed(testError)).toEqual(testAction);
    });
});

describe('Test for Redux actions for creating a new reply', () => {

    test('should create an action of creatingReply there should be a reply in the payload', () => {
        const testAction = {
            type: actions.postActionTypes.creatingReply,
            payload: reply0
        }
        expect(actions.creatingReply(reply0)).toEqual(testAction);
    });

    test('should create an action of createReplySuccess with the localReply and serverReply as a payload', () => {
        const testCode: number = 201;
        const testAction = {
            type: actions.postActionTypes.createReplySuccess,
            payload: { localReply: reply0, serverReply: reply0 }
        }
        expect(actions.createReplySuccess(reply0, reply0)).toEqual(testAction);
    });

    test('should create action for createReplyFailed with error and localReply as a payload', () => {
        const testError = Error('there is an error!');
        const testAction = {
            type: actions.postActionTypes.createReplyFailed,
            payload: { error: testError, localReply: reply0 }
        }
        expect(actions.createReplyFailed(testError, reply0)).toEqual(testAction);
    });
});

describe('resetting postsState tests', () => {
    test('should create action for resetting postsState with no payload', () => {
        const testAction = {
            type: actions.postActionTypes.reset
        }
        expect(actions.resetPostState()).toEqual(testAction);
    });
});