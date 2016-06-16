import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-delete';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-delete',
  message: 'Unallowed use of `delete`'
};

ruleTester.run('no-delete', rule, {
  valid: [
    '+foo.bar',
    '-foo.bar',
    '+ foo.bar',
    '- foo.bar',
    '+foo[bar]',
    '-foo[bar]',
    '+ foo[bar]',
    '- foo[bar]',
    'bar.delete'
  ],
  invalid: [
    {
      code: 'delete foo.bar;',
      errors: [error]
    },
    {
      code: 'delete foo[bar];',
      errors: [error]
    }
  ]
});
