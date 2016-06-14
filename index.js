'use strict';

module.exports = {
  rules: {
    'no-let': require('./rules/no-let'),
    'no-mutation': require('./rules/no-mutation'),
    'no-this': require('./rules/no-this')
  },
  configs: {
    recommended: {
      rules: {
        'no-var': 'error',
        'fp/no-let': 'error',
        'fp/no-mutation': 'error',
        'fp/no-this': 'error'
      }
    }
  }
};
