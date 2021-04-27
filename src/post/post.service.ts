import axios from 'axios';
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
    getAllPosts(): Promise<Post []> {
        return axios.get(this.URI).then(result => result.data);
    }
}

export default new PostService;