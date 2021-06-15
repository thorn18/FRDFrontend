import Reply, { NewReply } from "../src/models/reply";

export const reply0: Reply = {
    "id": "dd2074bf-92f0-44af-8314-f708039f43b7",
    "username": "Green",
    "content": "pretty sus ngl",
    "timestamp": new Date("2020-11-12T10:00:00"),
    "postId": "4935a60c-85e0-476b-9999-9cb0fe08764e",
    "error": Error('Unauthorized.')
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

export const replyList1 = {
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

export const replyListA = {
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
    "totalCount": 15
}

export const replyListB = {
    "pageSize": 5,
    "items": [
        reply0,
        reply1,
        reply7,
        reply6,
        reply5,
    ],
    "offset": 5,
    "hasNext": true,
    "totalCount": 15
}

export const replyListC = {
    "pageSize": 5,
    "items": [
        reply0,
        reply1,
        reply7,
        reply6,
        reply5,
    ],
    "offset": 10,
    "hasNext": true,
    "totalCount": 15
}

export const newReply:NewReply = {
    username: "bob",
    content: "wow. such a great post.",
    postId: "123"
}