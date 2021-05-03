import Post from "../src/models/post";
import Reply from "../src/models/reply";
import {replyList0, replyList1} from './testReplyData';

export const post0: Post = {
    post: {
        id: '0',
        username: 'Bob',
        description: 'My test post!',
        timestamp: new Date('Tue Apr 20 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 0,
        imageId: 'image'
    },
    user: {
        id: '0',
        username: 'Bob',
        profileImage: 'profilePic'
    },
    comments: replyList0
}

export const post1: Post = {
    post: {
        id: '1',
        username: 'user1',
        description: 'post 1',
        timestamp: new Date('Wed Apr 21 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 3,
        imageId: 'img1'
    },
    user: { id: 'userId1', username: 'user1', profileImage: 'prof1' },
    comments: replyList0
}

export const post2: Post = {
    post: {
        id: '2',
        username: 'user2',
        description: 'post 2',
        timestamp: new Date('Thu Apr 22 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 5,
        imageId: 'img2'
    },
    user: { id: 'userId2', username: 'user2', profileImage: 'prof2' },
    comments: replyList0
}

export const post3: Post = {
    post: {
        id: '3',
        username: 'user3',
        description: 'post 3',
        timestamp: new Date('Fri Apr 23 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 4,
        imageId: 'img3'
    },
    user: { id: 'userId3', username: 'user3', profileImage: 'prof3' },
    comments: replyList0
}

export const post4: Post = {
    post: {
        id: '4',
        username: 'user4',
        description: 'post 4',
        timestamp: new Date('Sat Apr 24 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 8,
        imageId: 'img4'
    },
    user: { id: 'userId3', username: 'user4', profileImage: 'prof4' },
    comments: replyList0
}

export const noProfilePic: Post = {
    post: {
        id: '5',
        username: 'user5',
        description: 'post 5',
        timestamp: new Date('Sat Apr 24 2021 00:00:00 GMT-0500 (Central Daylight Time'),
        likes: 0,
        imageId: 'image'
    },
    user: {
        id: '1',
        username: 'user5',
        profileImage: null
    },
    comments: replyList0
}
