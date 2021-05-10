import axios from 'axios';
import Post from '../models/post';
import { createPostFailed, createPostSuccess, creatingPost, gettingPosts, gotPostsFailed, gotPostsSuccess, PostAction, postActionTypes } from '../store/actions';

class PostService {
    private URI: string;
    constructor() {
        //URL of the API 
        this.URI = "http://35.223.52.208/api";
    }

    /**
     * Returns a dispatch(action) function
     * To use in a component: have a dispatch=useDispatch() hook, then call dispatch(PostService.getAllPosts())
     * See PaginationList.tsx for an example
     * @returns posts from API
     */
    getAllPosts(pageSize: number = 5, offset: number = 0 ) {
        return (dispatch: (action: PostAction) => void) => {
            dispatch(gettingPosts()); //action
            return axios.get(`${this.URI}/posts?offset=${offset}&pageSize=${pageSize}&comPageSize=5`) //need to include comment pagesize
            .then(response => {
                dispatch(gotPostsSuccess(response.data)); //type any as of now
            }).catch(err => {
                dispatch(gotPostsFailed(err)); //action
            });
        };
    }

    createPost(post: Post){
        return (dispatch: (action: PostAction) => void) => {
            dispatch(creatingPost());
            return axios.post(`${this.URI}/posts`, post)
            .then(response => {
                dispatch(createPostSuccess(response.data))
            }).catch(err => {
                dispatch(createPostFailed(err))
            });
        }
    }
}

export default new PostService;