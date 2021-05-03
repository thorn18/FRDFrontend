import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import ReplyList from '../src/components/Reply/ReplyList';
import Reply from '../src/models/reply';
import {reply0, reply1, reply7, reply6, reply5, reply4, reply3, reply2} from './testData'
