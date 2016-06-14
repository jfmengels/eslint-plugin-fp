'use strict';

module.exports = {
  rules: {
    'no-let': require('./rules/no-let')
  },
  configs: {
    recommended: {
      rules: {
        'no-var': 'error',
        'fp/no-let': 'error'
      }
    }
  }
};
