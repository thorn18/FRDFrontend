import axios from 'axios';
import { postActionTypes, gettingReplies, gotRepliesFailed, gotRepliesSuccess, PostAction } from '../store/actions';

class ReplyService {
    private URI: string;
    constructor() {
        //URL of the API 
        this.URI = "http://35.223.52.208/api/comments/";
    }

    getMoreReplies(postid: string, offset: number = 0) {
        return (dispatch: (action: PostAction) => void) => {
            dispatch(gettingReplies()); //action
            return axios.get(`${this.URI}${postid}?offset=${offset}&pageSize=5`)
            .then(response => {
                dispatch(gotRepliesSuccess(response.data)); //type any as of now
            }).catch(err => {
                dispatch(gotRepliesFailed(err)); //action
            });
        };
    }
}

export default new ReplyService;