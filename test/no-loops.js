import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-loops';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = message => ({
  ruleId: 'no-loops',
  message
});
const forError = error('Unallowed use of `for` loop');
const whileError = error('Unallowed use of `while` loop. Use recursion instead');

ruleTester.run('no-loops', rule, {
  valid: [],
  invalid: [
    {
      code: 'for (var i = 0; i < foo.length; i++) {}',
      errors: [forError]
    },
    {
      code: 'for (variable in object) {}',
      errors: [forError]
    },
    {
      code: 'for (variable of object) {}',
      errors: [forError]
    },
    {
      code: 'while (i < 5) {}',
      errors: [whileError]
    },
    {
      code: 'do {} while (i < 5);',
      errors: [whileError]
    }
  ]
});
