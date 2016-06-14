import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-let';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-let',
  message: 'Unallowed use of `let`. Use `const` instead'
};

ruleTester.run('no-let', rule, {
  valid: [
    'const a = 1;',
    'const a = 1, b = 2;',
    'const a = 1; const b = 2;',
    'export const a = 1;',
    // Allowing `var` as there is a core ESLint rule for it
    'var a;',
    'var a, b;',
    'var a = 1;',
    'var a = 1, b = 2;',
    'var a = 1; const b = 2;'
  ],
  invalid: [
    {
      code: 'let a;',
      errors: [error]
    },
    {
      code: 'let a, b;',
      errors: [error]
    },
    {
      code: 'let a = 2',
      errors: [error]
    },
    {
      code: 'let a = 2, b = 100;',
      errors: [error]
    },
    {
      code: 'let a = 2; let b = 100;',
      errors: [error, error]
    },
    {
      code: 'export let a = 2;',
      errors: [error]
    }
  ]
});
