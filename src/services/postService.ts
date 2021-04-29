import axios from 'axios';
import { gettingPosts, gotPostsFailed, gotPostsSuccess, postActionTypes } from '../store/actions';

class PostService {
    private URI: string;
    constructor() {
        //URL of the API 
        this.URI = "http://35.223.52.208/api";
    }

    /**
     * 
     * @returns posts from API
     */
    getAllPosts(pageSize: number = 5, offset: number = 0 ) {
        console.log("Attempting to get all posts");
        return (dispatch: (arg0: { type: postActionTypes; payload?: any; }) => void) => {
            dispatch(gettingPosts()); //action
            return axios.get(`${this.URI}/posts?offset=${offset}&pageSize=${pageSize}&comPageSize=1`) //need to include comment pagesize
            .then(response => {
                dispatch(gotPostsSuccess(response.data)); //type any as of now
            }).catch(err => {
                dispatch(gotPostsFailed(err)); //action
            });
        };
    }

}

export default new PostService;