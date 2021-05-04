import axios from 'axios';
import thunk from 'redux-thunk';
import ReplyService from '../src/services/replyService';
import { postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store';
import { replyList0 } from './testReplyData';

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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
          const store = mockStore({ posts: [] })

        axios.get.mockResolvedValue({
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
          const store = mockStore({ posts: [] })

        axios.get.mockResolvedValue({
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

        const expectedActions = [
            { type: postActionTypes.gettingReplies },
            { type: postActionTypes.gotRepliesFailed, payload: 'oh no!' }
        ]
          const store = mockStore({ posts: [] })

        axios.get.mockRejectedValue(new Error('oh no!'), 500);

        return store.dispatch(ReplyService.getMoreReplies(testPostId)).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=0&pageSize=5`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
