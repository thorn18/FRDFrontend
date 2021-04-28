import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Navbar from '../src/component/Navbar/Navbar'

afterEach(cleanup);

describe('test login menu', () => {
    it('renders with menu closed', () => {
        const { getByTestId } = render(<Navbar/>);

        // expect(getByTestId("login-link")).toBeDisabled();

    })
})

