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
    'var obj = {foo: "bar", bar: 1, baz: {}}',
    'obj.foo()',
    'foo()'
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
    },
    {
      code: 'person.__defineGetter__("name", fn);',
      errors: [error('Unallowed use of a getter using `__defineGetter__`')]
    },
    {
      code: 'person.__defineSetter__("name", fn);',
      errors: [error('Unallowed use of a setter using `__defineSetter__`')]
    },
    {
      code: 'person["__defineGetter__"]("name", fn);',
      errors: [error('Unallowed use of a getter using `__defineGetter__`')]
    },
    {
      code: 'person["__defineSetter__"]("name", fn);',
      errors: [error('Unallowed use of a setter using `__defineSetter__`')]
    }
  ]
});
