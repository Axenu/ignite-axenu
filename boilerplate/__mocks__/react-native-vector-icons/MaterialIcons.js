// module.exports = {
//   loadFont: jest.fn(),
// };

import React, { PureComponent } from 'react';

class Icon extends PureComponent {
  render() {
    return null;
  }
}

Icon.loadFont = jest.fn();

module.exports = Icon;
// default.export const c = 0;
