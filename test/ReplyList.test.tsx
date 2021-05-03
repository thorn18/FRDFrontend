import React from 'react';
import { render, cleanup, getByTestId } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyList from '../src/components/Reply/ReplyList';
import Reply from '../src/models/reply';
import {post0, post1} from './testData'
import {replyList0, replyList1} from './testReplyData';
import Replies from '../src/models/replies';
import Post from '../src/models/post';

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
})
