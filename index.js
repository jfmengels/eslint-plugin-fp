'use strict';

module.exports = {
  rules: {
    'no-class': require('./rules/no-class'),
    'no-delete': require('./rules/no-delete'),
    'no-events': require('./rules/no-let'),
    'no-get-set': require('./rules/no-let'),
    'no-let': require('./rules/no-let'),
    'no-loops': require('./rules/no-loops'),
    'no-mutating-assign': require('./rules/no-mutating-assign'),
    'no-mutation': require('./rules/no-mutation'),
    'no-nil': require('./rules/no-nil'),
    'no-proxy': require('./rules/no-proxy'),
    'no-this': require('./rules/no-this'),
    'no-throw': require('./rules/no-throw'),
    'no-unused-expression': require('./rules/no-unused-expression')
  },
  configs: {
    recommended: {
      rules: {
        'no-var': 'error',
        'fp/no-class': 'error',
        'fp/no-delete': 'error',
        'fp/no-events': 'error',
        'fp/no-get-set': 'error',
        'fp/no-let': 'error',
        'fp/no-loops': 'error',
        'fp/no-mutating-assign': 'error',
        'fp/no-mutation': 'error',
        'fp/no-nil': 'error',
        'fp/no-proxy': 'error',
        'fp/no-this': 'error',
        'fp/no-throw': 'error',
        'fp/no-unused-expression': 'error'
      }
    }
  }
};
