export default interface Reply{
    replyId: string,
    username: string,
    content: string,
    timestamp: Date,
    postId: string,
    local?: boolean,
    error?: Error | undefined
}

export interface NewReply{
    username: string,
    content: string,
    postId: string
}