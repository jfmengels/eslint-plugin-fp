import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-throw';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-throw',
  message: 'Unallowed use of `throw`'
};

ruleTester.run('no-throw', rule, {
  valid: [
    'new Error("foo");'
  ],
  invalid: [
    {
      code: 'throw new Error("foo");',
      errors: [error]
    },
    {
      code: 'throw error;',
      errors: [error]
    }
  ]
});
