import React from 'react'
import {render, fireEvent, cleanup} from '@testing-library/react'
import Navbar from '../src/component/Navbar/Navbar'

describe('test login menu', () => {
    afterEach(cleanup)

    it('renders with menu closed', () => {
        const {getByTestId} = render(<Navbar/>);
    })
})

