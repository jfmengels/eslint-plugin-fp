import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-nil';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = message => ({
  ruleId: 'no-nil',
  message
});
const useOfNullOrUndefinedError = error('Unallowed use of `null` or `undefined`');
const notInitializedError = error('Variable must be initialized, so that it doesn\'t evaluate to `undefined`');
const returnUndefinedError = error('Return statement must return an explicit value, so that it doesn\'t evaluate to `undefined`');
const functionReturnError = error('Function must end with a return statement, so that it doesn\'t return `undefined`');

ruleTester.run('no-nil', rule, {
  valid: [
    'var a = 1;',
    'let a = 1;',
    'const a = 1;',
    'var a = b;',
    'let a = b;',
    'const a = b;',
    'a == null',
    'a == undefined',
    'a != null',
    'a != undefined',
    'a === null',
    'a === undefined',
    'a !== null',
    'a !== undefined',
    'function foo() { return 1; }',
    'function foo(a=1) { return 1; }',
    'const foo = () => 1;'
  ],
  invalid: [
    {
      code: 'var a = null;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'let a = null;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const a = null;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'var a = undefined;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'let a = undefined;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const a = undefined;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'a < null;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'a < undefined;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'a < undefined;',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'a === foo || null',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: '(a === foo) || null',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'a === (foo || null)',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const obj = {foo: null};',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const obj = {foo: undefined};',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'let a;',
      errors: [notInitializedError]
    },
    {
      code: 'var a;',
      errors: [notInitializedError]
    },
    {
      code: 'var a, b;',
      errors: [notInitializedError, notInitializedError]
    },
    {
      code: 'function foo(a=null) { return 1; }',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'function foo(a=undefined) { return 1; }',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const foo = () => null',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const foo = () => undefined',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'const foo = () => {}',
      errors: [functionReturnError]
    },
    {
      code: 'function foo() {}',
      errors: [functionReturnError]
    },
    {
      code: 'function foo() { return; }',
      errors: [returnUndefinedError]
    },
    {
      code: 'function foo() { return null; }',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'function foo() { return undefined; }',
      errors: [useOfNullOrUndefinedError]
    },
    {
      code: 'function foo() { if (foo) { return; } return a + b; }',
      errors: [returnUndefinedError]
    },
    {
      code: 'a.map(function() {});',
      errors: [functionReturnError]
    },
    {
      code: 'function foo() { a + b; }',
      errors: [functionReturnError]
    },
    {
      code: 'function foo() { a + b; return; }',
      errors: [returnUndefinedError]
    }
  ]
});
