import axios, {AxiosResponse} from 'axios';
import PostService from '../src/services/postService';
import { gettingPosts, gotPostsFailed, gotPostsSuccess, postActionTypes } from '../src/store/actions';
import axiosMock from 'axios';    
jest.mock('axios');
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getPosts()', () => {

  test('should return all posts', async () => {

    const posts = { posts: [
      {"pageSize":1,
      "items":[
                {"post":
                  {"id":"4935a60c-85e0-476b-9999-9cb0fe08764e",
                  "username":"Richard",
                  "description":"All done!",
                  "timestamp":"2021-04-23T02:02:44.2551347+00:00",
                  "likes":19,
                  "imageId":"4935a60c-85e0-476b-9999-9cb0fe087649"},
                  "user":{
                          "id":"00000000-0000-0000-0000-000000000000",
                          "username":"Richard",
                          "profileImage":"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/14112506/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg"
                         },
                  "comments":{
                              "pageSize":1,
                              "items":[
                                        {"id":"4ebe6588-9fd4-45e8-b9d1-830df5ef127d",
                                         "username":"Green",
                                         "content":"pretty sus ngl",
                                         "timestamp":"2020-11-12T10:00:00",
                                         "postId":"4935a60c-85e0-476b-9999-9cb0fe08764e"}
                                      ],
                              "offset":0,
                              "hasNext":true,
                              "totalCount":3
                             }
                }
              ],
      "offset":0,
      "hasNext":true,
      "totalCount":0}
    ]}

    const expectedActions = [
      { type: postActionTypes.gettingPosts },
      { type: postActionTypes.gotPostsSuccess, payload: posts }
    ]
    const store = mockStore({ posts: [] })

    axios.get.mockResolvedValue({
      data: posts,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    return store.dispatch(PostService.getAllPosts()).then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
});



