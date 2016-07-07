import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-proxy';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-proxy',
  message: 'Unallowed use of `Proxy`'
};

ruleTester.run('no-proxy', rule, {
  valid: [
    'Map',
    'Map()',
    'new Map()'
  ],
  invalid: [
    {
      code: 'Proxy',
      errors: [error]
    },
    {
      code: 'new Proxy(foo, bar);',
      errors: [error]
    },
    {
      code: 'Proxy.revocable()',
      errors: [error]
    }
  ]
});
