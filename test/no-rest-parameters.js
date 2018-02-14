import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-rest-parameters';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-rest-parameters',
  message: 'Unallowed use of rest parameters. Use regular function arguments instead'
};

ruleTester.run('no-rest-parameters', rule, {
  valid: [
    'function foo() {}',
    'function foo(a, b) {}',
    'function foo(a, b) { return a + b; }',
    'var foo = (a, b) => a + b;',
    'function foo() { console.log(arguments); }',
    'var a = [...b, c]',
    {
      code: 'var a = {...b, c: 1}',
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true
        }
      }
    }
  ],
  invalid: [
    {
      code: 'function foo(...args) {}',
      errors: [error]
    },
    {
      code: 'function foo(a, b, ...args) {}',
      errors: [error]
    },
    {
      code: 'fn(function(...args) {})',
      errors: [error]
    },
    {
      code: 'var foo = function(...args) {}',
      errors: [error]
    },
    {
      code: 'var foo = (...args) => {}',
      errors: [error]
    }
  ]
});
