import axios from 'axios';
import { gettingPosts, gotPostsFailed, gotPostsSuccess, postActionTypes } from '../store/actions';
//import {Post} from './post';

class PostService {
    private URI: string;
    constructor(){
        //URL of the API 
        this.URI = "http://35.223.52.208";
    }

    /**
     * retrieving posts to be loaded
     * @returns all posts existing in the database
     */
    // getAllPosts(): Promise<Post []> {
    //     return axios.get(this.URI).then(result => result.data);
    // }

    getAllPosts() {
        return (dispatch: (arg0: { type: postActionTypes; payload?: any; }) => void) => {
            dispatch(gettingPosts()); //action
            return axios.get(`${this.URI}`)
            .then(response => {
                dispatch(gotPostsSuccess(response.data)); //type any as of now
            }).catch(err => {
                dispatch(gotPostsFailed(err)); //action
            });
        };
};
}

export default new PostService;