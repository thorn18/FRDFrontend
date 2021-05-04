import User from './user';
import Replies from './replies';

export default interface Post {
    post: {
        id: string,
        username: string,
        description: string,
        timestamp: Date,
        likes: number,
        imageId: string
    },
    user: User,
    comments: Replies
}