import axios from 'axios';
import { gettingPosts, gotPostsFailed, gotPostsSuccess, postActionTypes } from '../store/actions';

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
        return (dispatch: (arg0: { type: postActionTypes; payload?: any; }) => void) => {
            dispatch(gettingPosts()); //action
            return axios.get(`${this.URI}/posts?offset=${offset}&pageSize=${pageSize}&comPageSize=5`) //need to include comment pagesize
            .then(response => {
                dispatch(gotPostsSuccess(response.data)); //type any as of now
            }).catch(err => {
                dispatch(gotPostsFailed(err)); //action
            });
        };
    }

}

export default new PostService;