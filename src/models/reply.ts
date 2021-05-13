export default interface Reply{
    id: string,
    username: string,
    content: string,
    timestamp: Date,
    postId: string
}

export interface NewReply{
    username: string,
    content: string,
    postId: string
}