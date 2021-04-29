import User from './user';
import Reply from './reply';

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
    replies: Reply[]
}