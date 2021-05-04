import axios from 'axios';
import thunk from 'redux-thunk';
import ReplyService from '../src/services/replyService';
import { postActionTypes } from '../src/store/actions';
import configureMockStore from 'redux-mock-store'
// import * as posts from './fivePosts.json'
import * as replies0 from './fiveReplies.json'
import * as replies1 from './fiveRepliesNext.json'

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

afterEach(() => {
    jest.clearAllMocks();
});

describe('should get more comments for a post', () => {

    test('that an axios call is made', async () => {
        const testPostId = 'testPostId';
        
        axios.get.mockResolvedValue({
            data: replies0,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          });

        let result = await ReplyService.getMoreReplies(testPostId);
        expect(result).toBe(replies0);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=0&pageSize=5`);
    });

    test('that an axios call is made with an offset', async () => {
        const testPostId = 'testPostId';
        
        axios.get.mockResolvedValue({
            data: replies1,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          });

        let result = await ReplyService.getMoreReplies(testPostId, 5);
        expect(result).toBe(replies1);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`http://35.223.52.208/api/comments/${testPostId}?offset=5&pageSize=5`);
    });
});
