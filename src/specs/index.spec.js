import React from 'react';
import ReactDOM from 'react-dom';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
// import 'jest-dom/extended-excepted';

import App from '../app'

it("render without crashing", () => {
  const element = document.createElement('div');
  ReactDOM.render(<App></App>, element);
})

it("input button correctly", () => {
  const { getById } = render( <App value="andra" />)
  expect(getById("input")).toHaveTextContent('Andra')
})