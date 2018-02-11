import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-class';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-class',
  message: 'Unallowed use of `class`. Use functions instead'
};

ruleTester.run('no-class', rule, {
  valid: [
    'function foo() {}'
  ],
  invalid: [
    {
      code: `class Polygon {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }
      }`,
      errors: [error]
    },
    {
      code: 'export default class MyComponent extends React.Component {}',
      errors: [error]
    },
    {
      code: 'module.exports = class MyClass {}',
      errors: [error]
    },
    {
      code: 'const MyClass = class {}',
      errors: [error]
    }
  ]
});
