import axios from 'axios';

class ReplyService {
    private URI: string;
    constructor() {
        //URL of the API 
        this.URI = "http://35.223.52.208/api/comments/";
    }

    getMoreReplies = async (postid: string, offset: number = 0) => {
        try {
            const result = await axios.get(`${this.URI}${postid}?offset=${offset}&pageSize=5`);
            return result.data;
        } catch(error) {
            console.log(error);
        }
    }
}

export default new ReplyService;