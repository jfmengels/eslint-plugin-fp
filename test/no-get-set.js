import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-get-set';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = message => ({
  ruleId: 'no-get-set',
  message
});
const getError = error('Unallowed use of `get`');
const setError = error('Unallowed use of `set`');

ruleTester.run('no-get-set', rule, {
  valid: [
    'var obj = {foo: "bar"}',
    'var obj = {foo: "bar", bar: 1, baz: {}}'
  ],
  invalid: [
    {
      code: 'var obj = { get foo () {} }',
      errors: [getError]
    },
    {
      code: 'var obj = { get foo () {}, bar: "baz" }',
      errors: [getError]
    },
    {
      code: 'var obj = { get foo () {}, get bar () {} }',
      errors: [getError, getError]
    },
    {
      code: 'var obj = { set foo (a) {} }',
      errors: [setError]
    },
    {
      code: 'var obj = { set foo (a) {}, set bar (a) {} }',
      errors: [setError, setError]
    },
    {
      code: 'var obj = { get foo () {}, set foo (a) {} }',
      errors: [getError, setError]
    }
  ]
});
