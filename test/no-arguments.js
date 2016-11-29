import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-arguments';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-arguments',
  message: 'Unallowed use of `arguments`. Use regular function arguments instead'
};

ruleTester.run('no-arguments', rule, {
  valid: [
    'function foo() {}',
    'function foo(a, b) {}',
    'function foo(a, b) { return a + b; }',
    'var foo = (a, b) => a + b;',
    'function foo(...args) {}',
    'function foo(...args) {}',
    'function foo() { console.log(argument); }',
    'function foo() { console.log(node.arguments); }',
    'node.arguments',
    'var obj = { arguments: [] }'
  ],
  invalid: [
    {
      code: 'function foo() { console.log(arguments); }',
      errors: [error]
    },
    {
      code: 'function foo() { console.log(arguments[0]); }',
      errors: [error]
    },
    {
      code: 'function foo() { console.log(arguments.node); }',
      errors: [error]
    },
    {
      code: 'function foo() { console.log({value: arguments}); }',
      errors: [error]
    },
    {
      code: 'function foo() { var args = Array.prototype.slice.call(arguments); }',
      errors: [error]
    }
  ]
});
