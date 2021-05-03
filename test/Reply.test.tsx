import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyComponent from '../src/components/Reply/Reply'
import Reply from '../src/models/reply';

afterEach(cleanup);

describe('Tests for comment component', () => {
    test('that you can see the commenter\'s username', () => {
        const testComment: Reply = {
            id: 'testId',
            username: 'testUser',
            content: 'bla bla bla',
            timestamp: new Date(),
            postId: 'testPostId'
        }

        const { getByTestId } = render(<ReplyComponent reply={testComment}/>);

        expect(getByTestId('commenter')).toBeVisible();
        expect(getByTestId('comment-content')).toBeVisible();
    });
});