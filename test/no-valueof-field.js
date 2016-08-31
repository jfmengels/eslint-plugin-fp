import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-valueof-field';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-valueof-field',
  message: 'Unallowed use of `valueOf` field'
};

ruleTester.run('no-valueof-field', rule, {
  valid: [
    'function valueOf() {}',
    'const object = { value: () => {} };',
    'const object = { ["value"]: () => {} };',
    'const object = {}; object.value = () => {}',
    'const object = {}; object.prototype.value = () => {}',
    'valueOf = 2;',
    'object.valueOf();',
    'const array = [valueOf, valueOf];'
  ],
  invalid: [
    {
      code: 'const object = { valueOf: () => {} };',
      errors: [error]
    },
    {
      code: 'const object = { ["valueOf"]: () => {} };',
      errors: [error]
    },
    {
      code: 'const valueOf = () => {}; const object = { valueOf };',
      errors: [error]
    },
    {
      code: 'const object = {}; object.valueOf = () => {}',
      errors: [error]
    },
    {
      code: 'object.prototype.valueOf = () => {}',
      errors: [error]
    }
  ]
});
