import React from 'react';
import './ReplyList.css'
import { useDispatch } from 'react-redux';
import Post from '../../models/post';
import replyService from '../../services/replyService';

interface replyListProp {
    post: Post
}

/**
 * This component adds functionality for the view more/all comment buttons which displays the hidden comments.
 * If there are more than 5 comments remaining, button will display 'View more comments'.
 * If there are 5 or less comments remaining, button will display 'View all comments'.
 * @param props - the specific post for which the comments are displayed.
 */

function ReplyList(props: replyListProp) {

    const dispatch = useDispatch();
    const loadMoreReplies = () => {
        dispatch(replyService.getMoreReplies(props.post.post.postId, props.post.comments.items.length));
    }

    return (
        <button onClick={loadMoreReplies}
            data-testid={'more-com-btn'}
            hidden={!props.post.comments.hasNext}
            className="viewMoreCommentsBtn" >
            {props.post.comments.totalCount - props.post.comments.items.length <= 5 ? 'View all comments' : 'View more comments'}
        </button>
    )
}

export default ReplyList;