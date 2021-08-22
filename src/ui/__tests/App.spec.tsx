import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { App } from '../App';

afterEach(cleanup);

it('does not crash', () => {
    render(<App />);
});
