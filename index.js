'use strict';

module.exports = {
  rules: {
    'no-class': require('./rules/no-class'),
    'no-let': require('./rules/no-let'),
    'no-loops': require('./rules/no-loops'),
    'no-mutating-assign': require('./rules/no-mutating-assign'),
    'no-mutation': require('./rules/no-mutation'),
    'no-this': require('./rules/no-this')
  },
  configs: {
    recommended: {
      rules: {
        'no-var': 'error',
        'fp/no-class': 'error',
        'fp/no-let': 'error',
        'fp/no-loops': 'error',
        'fp/no-mutating-assign': 'error',
        'fp/no-mutation': 'error',
        'fp/no-this': 'error'
      }
    }
  }
};
