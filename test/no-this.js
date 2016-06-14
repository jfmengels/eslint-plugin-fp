import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-this';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-this',
  message: 'Unallowed use of `this`'
};

ruleTester.run('no-this', rule, {
  valid: [
    'foo;',
    'var foo;'
  ],
  invalid: [
    {
      code: 'this;',
      errors: [error]
    },
    {
      code: 'this.a;',
      errors: [error]
    },
    {
      code: 'function a() {this;};',
      errors: [error]
    },
    {
      code: 'function a() {return this.foo();};',
      errors: [error]
    }
  ]
});
