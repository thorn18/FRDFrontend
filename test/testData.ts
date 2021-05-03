import Post from "../src/models/post";
import Reply from "../src/models/reply";

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
    replies: []
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
    replies: []
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
    replies: []
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
    replies: []
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
    replies: []
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
    replies: []
}

export const reply0: Reply = {
    "id": "dd2074bf-92f0-44af-8314-f708039f43b7",
    "username": "Green",
    "content": "pretty sus ngl",
    "timestamp": new Date("2020-11-12T10:00:00"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply1: Reply = {
    "id": "8debb283-e46f-4fae-8d91-4deefba935ca",
    "username": "Blue",
    "content": "Red sus",
    "timestamp": new Date("2020-10-11T10:00:05"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply2: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306e",
    "username": "Red",
    "content": "Why is my name red",
    "timestamp": new Date("2020-09-01T10:00:10"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply3: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306f",
    "username": "Red",
    "content": "it is my favorite color",
    "timestamp": new Date("2020-09-01T10:00:15"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply4: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306g",
    "username": "Red",
    "content": "but it does not define who i am",
    "timestamp": new Date("2020-09-01T10:00:20"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply5: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306h",
    "username": "Red",
    "content": "the only thing that would apply to would be an orange.",
    "timestamp": new Date("2020-09-01T10:00:25"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply6: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306i",
    "username": "Red",
    "content": "because it is both a color and a name of a fruit.",
    "timestamp": new Date("2020-09-01T10:00:30"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}

export const reply7: Reply = {
    "id": "16941f34-577a-41fc-90f8-10702dac306j",
    "username": "Red",
    "content": "so in conclusion, i would like to change my name to happiness.",
    "timestamp": new Date("2020-09-01T10:00:35"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e"
}


export const replyList0 = {
    "comments": {
        "pageSize": 5,
        "items": [
            reply0,
            reply1,
            reply7,
            reply6,
            reply5, 
        ],
        "offset": 0,
        "hasNext": true,
        "totalCount": 8
    }
}

export const replyList1 = {
    "comments": {
        "pageSize": 5,
        "items": [
            reply4,
            reply3,
            reply2
        ],
        "offset": 5,
        "hasNext": false,
        "totalCount": 8
    }
}


