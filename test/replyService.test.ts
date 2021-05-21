import axios from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import ReplyService from '../src/services/replyService';
import { postActionTypes } from '../src/store/postActions';
import configureMockStore from 'redux-mock-store';
import { newReply, reply0, replyList0 } from './testReplyData';
import { AnyAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

jest.mock('axios');

const initialState = {};
type State = typeof initialState;
const middlewares = [thunk]
const mockStore = configureMockStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);

afterEach(() => {
    jest.clearAllMocks();
});

describe('should get more comments for a post', () => {

    test('that an axios call is made', async () => {
        const testPostId = replyList0.items[0].postId;

        const expectedActions = [
            { type: postActionTypes.gettingReplies },
            { type: postActionTypes.gotRepliesSuccess, payload: replyList0 }
        ]
        const store = mockStore({ posts: [] });

        (axios.get as jest.Mock).mockResolvedValue({
            data: replyList0,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });

        return store.dispatch(ReplyService.getMoreReplies(testPostId)).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=0&pageSize=5`);
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    test('that an axios call is made with an offset', async () => {
        const testPostId = replyList0.items[0].postId;

        const expectedActions = [
            { type: postActionTypes.gettingReplies },
            { type: postActionTypes.gotRepliesSuccess, payload: replyList0 }
        ]
        const store = mockStore({ posts: [] });

        (axios.get as jest.Mock).mockResolvedValue({
            data: replyList0,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        });

        return store.dispatch(ReplyService.getMoreReplies(testPostId, 5)).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=5&pageSize=5`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('that an axios error is handled', async () => {
        const testPostId = replyList0.items[0].postId;

        //this error brought to you by calling the api with an invalid postid
        let error = {
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "One or more validation errors occurred.",
            "status": 400,
            "traceId": "00-dc31d7e70dab4d4483960ec274708559-fdbbaef2da491748-00",
            "errors": { "id": ["oh no!"] }
        }

        const expectedActions = [
            { type: postActionTypes.gettingReplies },
            { type: postActionTypes.gotRepliesFailed, payload: error }
        ]
        const store = mockStore({ posts: [] });

        (axios.get as jest.Mock).mockRejectedValue(error);

        return store.dispatch(ReplyService.getMoreReplies(testPostId)).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=0&pageSize=5`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('should create a comment for a post', () => {
    const testPostId = newReply.postId;
    const token = 'testToken';
    const config = { 'headers': { 'Authorization': `Bearer ${token}` } }
    test('that an axios call is made', async () => {
        const expectedActions = [
            { type: postActionTypes.creatingReply },
            { type: postActionTypes.createReplySuccess, payload: reply0 }
        ]
        const store = mockStore({ posts: [] })

        axios.post.mockResolvedValue({
            data: reply0,
            status: 201,
            statusText: 'OK',
            headers: {},
            config: {},
        });

        return store.dispatch(ReplyService.createReply(newReply, token)).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/`, newReply, config);
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    test('that an axios error is handled', async () => {
        //this error brought to you by calling the api with an invalid postid
        let error = {
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "One or more validation errors occurred.",
            "status": 400,
            "traceId": "00-dc31d7e70dab4d4483960ec274708559-fdbbaef2da491748-00",
            "errors": { "id": ["oh no!"] }
        }

        const expectedActions = [
            { type: postActionTypes.creatingReply },
            { type: postActionTypes.createReplyFailed, payload: error }
        ]
        const store = mockStore({ posts: [] })

        axios.post.mockRejectedValue(error);

        return store.dispatch(ReplyService.createReply(newReply, token)).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/`, newReply, config);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('should create a comment for a post locally only', () => {
    const testPostId = newReply.postId;
    const token = 'testToken';
    const config = { 'headers': { 'Authorization': `Bearer ${token}` } };

    it('that an axios call is NOT made', async () => {

        const expectedActions = [
            { type: postActionTypes.creatingReply },
            { type: postActionTypes.createReplySuccess, payload: reply0 }
        ]
        const store = mockStore({ posts: [] });

        store.dispatch(ReplyService.createReply(reply0, token, true));
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).not.toHaveBeenCalledWith(`http://35.223.52.208/api/comments`, reply0, config);

        //cannot make timestamp and uuid match perfectly, so we just check the action types, content, username, and post id
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0]).toEqual({ type: postActionTypes.creatingReply });
        expect(store.getActions()[1].type).toEqual(postActionTypes.createReplySuccess);
        expect(typeof store.getActions()[1].payload).toBe(typeof reply0);
        expect(store.getActions()[1].payload.content).toEqual(reply0.content);
        expect(store.getActions()[1].payload.username).toEqual(reply0.username);
        expect(store.getActions()[1].payload.postId).toEqual(reply0.postId);

    });

});


