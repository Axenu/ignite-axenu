module.exports = {
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "airbnb"],
  "plugins": ["jest"],
  "rules": {
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    "jsx-a11y/click-events-have-key-event": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "no-plusplus": 0,
    "no-console": 0,
    "react/jsx-max-props-per-line": [1, { "when": "always" }],
    "no-restricted-syntax": 0,
    "guard-for-in": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-autofocus": 0,
    "no-await-in-loop": 0,
    "no-use-before-define": ["error", { "variables": false }],
    "react/no-array-index-key": 0,
    "global-require": 0,
    "react/prefer-stateless-function": 0,
    "import/no-extraneous-dependencies": ["error", {"packageDir": './'}],
    "react/sort-comp": 0
  },
  "env": {
    "browser": true,
    "jest/globals": true
  },
  "settings": {
    "import/resolver": "reactnative"
  }
};
