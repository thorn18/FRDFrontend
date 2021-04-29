import User from './user';

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
    //replies: Reply[]
}