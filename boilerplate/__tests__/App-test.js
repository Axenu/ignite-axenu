/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('Renders correctly', () => {
  // const app = new App();
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
