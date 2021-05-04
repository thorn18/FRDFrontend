import React, { useEffect, useState } from 'react';
import FlatList from 'flatlist-react';
//import ReplyComponent from './ReplyComponent';
import './ReplyList.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import Post from '../../models/post';
import replyService from '../../services/replyService';
//import ReplyService from '../../services/replyService';

interface replyListProp {
    post: Post
}


function ReplyList(props: replyListProp) {

    const dispatch = useDispatch();
    const loadMoreReplies = () => {
        dispatch(replyService.getMoreReplies(props.post.post.id, props.post.comments.items.length));
    }

    return (
        <div>
            <button onClick={loadMoreReplies}
                data-testid={'more-com-btn'}
                disabled={!props.post.comments.hasNext} >
                View All Comments
            </button>
        </div>
    )
}

export default ReplyList;