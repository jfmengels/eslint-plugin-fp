import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-mutating-assign';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-mutating-assign',
  message: 'Unallowed use mutating `Object.assign`'
};

ruleTester.run('no-mutating-assign', rule, {
  valid: [
    'foo.bar(a, b);',
    'foo.assign(a, b);',
    'Object.foo(a, b);',
    'Object.assign({});',
    'Object.assign({}, b);',
    'Object.assign({}, b, c, d, e);',
    'Object.assign({foo: 1, bar: 2}, b);',
    'Object.assign([1, 2], b);'
  ],
  invalid: [
    {
      code: 'Object.assign();',
      errors: [error]
    },
    {
      code: 'Object.assign(a);',
      errors: [error]
    },
    {
      code: 'Object.assign(a, b);',
      errors: [error]
    },
    {
      code: 'Object.assign(a, b, c, d, e);',
      errors: [error]
    },
    {
      code: 'var a = {foo: 1, bar: 2}; Object.assign(a, b);',
      errors: [error]
    }
  ]
});
