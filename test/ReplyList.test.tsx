import React from 'react';
import { render, cleanup, getByTestId, fireEvent, getAllByTestId } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyList from '../src/components/Reply/ReplyList';
import Reply from '../src/models/reply';
import replyService from '../src/services/replyService';
import {post0, post1} from './testData'
import {replyList0, replyList1} from './testReplyData';
import Replies from '../src/models/replies';
import Post from '../src/models/post';
import PostComponent from '../src/components/Post/PostComponent';

afterEach(cleanup);

const props: Post = post0
const props1: Post = post1

describe('', () => {

    it('the button appears with View More Comments', () => {   
        const {container, getByTestId} = render(<ReplyList post={props}/>);
        expect(getByTestId('more-com-btn')).toHaveTextContent('View More Comments');
    })

    it('the button is disabled if hasNext is false', () => {
        const {container, getByTestId} = render(<ReplyList post={props} />);
        expect(getByTestId('more-com-btn')).toBeDisabled();
    })

    it('the button is enabled if hasNext is true', () => {
        const {container, getByTestId} = render(<ReplyList post={props1} />);
        expect(getByTestId('more-com-btn')).not.toBeDisabled();
    })

    it('when the view more comments button is clicked, \
        the ReplyService is called and passes the data to ReplyComponent', () => {
        const {container, getByTestId} = render(<PostComponent post={props1} />);
        replyService.getMoreReplies = jest.fn().mockResolvedValue(replyList1);
        fireEvent.click(getByTestId('more-com-btn'));
        expect(replyService.getMoreReplies).toHaveBeenCalledTimes(1);
        const descendant = getByTestId('commenter')
        expect(getByTestId('post-card')).toContainElement(descendant)
    })
})
