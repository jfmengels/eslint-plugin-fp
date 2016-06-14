'use strict';

module.exports = {
  rules: {
    'no-let': require('./rules/no-let'),
    'no-this': require('./rules/no-this')
  },
  configs: {
    recommended: {
      rules: {
        'no-var': 'error',
        'fp/no-let': 'error',
        'fp/no-this': 'error'
      }
    }
  }
};
