import axios from 'axios';
import Reply, { NewReply } from '../models/reply';
import { gettingReplies, gotRepliesFailed, gotRepliesSuccess, PostAction, creatingReply, createReplySuccess, createReplyFailed } from '../store/postActions';
import { v4 as uuidv4 } from 'uuid';

class ReplyService {
    private URI: string;
    constructor() {
        //URL of the API 
        this.URI = "http://Photonbackend-env.eba-c6syafi3.us-east-2.elasticbeanstalk.com/api/replies";
    }

    getMoreReplies(postid: string, offset: number = 0) {
        return (dispatch: (action: PostAction) => void) => {
            dispatch(gettingReplies()); //action
            return axios.get(`${this.URI}/${postid}?offset=${offset}&pageSize=5`)
                .then(response => {
                    dispatch(gotRepliesSuccess(response.data)); //type any as of now
                }).catch(err => {
                    dispatch(gotRepliesFailed(err)); //action
                });
        };
    }

    createReply(reply: NewReply, token: string, noAxios?: boolean, resendReply?: Reply) {
        let localReply: Reply = {
            "replyId": uuidv4(),
            "username": reply.username,
            "content": reply.content,
            "timestamp": new Date(),
            "postId": reply.postId,
            "local": true
        };
        if (noAxios === true) {
            return (dispatch: (action: PostAction) => void) => {
                dispatch(creatingReply(localReply)); //action
                return setTimeout(() => { dispatch(createReplySuccess(localReply, localReply)) }, 2000)
            }
        } else {
            return (dispatch: (action: PostAction) => void) => {
                if (resendReply) {
                    localReply = resendReply
                } else {
                    dispatch(creatingReply(localReply))
                }
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                return axios.post(`${this.URI}`, reply, config)
                    .then(response => {
                        dispatch(createReplySuccess(response.data, localReply));
                    }).catch(err => {
                        dispatch(createReplyFailed(err, localReply)); //action
                    });
            };
        }

    }
}

export default new ReplyService();