import axios from 'axios';
import { NewReply } from '../models/reply';
import { gettingReplies, gotRepliesFailed, gotRepliesSuccess, PostAction, creatingReply, createReplySuccess, createReplyFailed } from '../store/actions';
import { v4 as uuidv4 } from 'uuid';

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

    createReply(reply: NewReply, token: string, local?: boolean) {
        if (local === true) {
            return (dispatch: (action: PostAction) => void) => {
                dispatch(creatingReply()); //action
                return (dispatch(createReplySuccess(
                    {
                        "id": uuidv4(),
                        "username": reply.username,
                        "content": reply.content,
                        "timestamp": new Date(),
                        "postId": reply.postId
                    }
                )))
            }
        } else {
            return (dispatch: (action: PostAction) => void) => {
                dispatch(creatingReply()); //action
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                return axios.post(`${this.URI}${reply.postId}`, reply, config)
                    .then(response => {
                        dispatch(createReplySuccess(response.data));
                    }).catch(err => {
                        dispatch(createReplyFailed(err)); //action
                    });
            };
        }

    }
}

export default new ReplyService();