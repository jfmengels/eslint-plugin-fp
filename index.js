'use strict';

const reqAll = require('req-all');

const rules = reqAll('rules', {camelize: false});

module.exports = {
  rules,
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
