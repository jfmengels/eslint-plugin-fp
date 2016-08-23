import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-mutating-methods';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const methodError = methodName => ({
  ruleId: 'no-mutating-methods',
  message: `The use of method \`${methodName}\` is not allowed as it might be a mutating method`
});

const objectError = methodName => ({
  ruleId: 'no-mutating-methods',
  message: `The use of method \`Object.${methodName}\` is not allowed as it will mutate its arguments`
});

ruleTester.run('no-mutating-methods', rule, {
  valid: [
    'value.foo()',
    'value.bar()',
    'value.concat()',
    'value["foo"](a)',
    {
      code: '_.push(a, b)',
      options: [{
        allowedObjects: ['_']
      }]
    },
    {
      code: '_.sort(a, b)',
      options: [{
        allowedObjects: ['_']
      }]
    },
    {
      code: 'R.reverse(a, b)',
      options: [{
        allowedObjects: ['R']
      }]
    },
    {
      code: 'R.sort(a, b)',
      options: [{
        allowedObjects: ['R']
      }]
    },
    'Object.keys(a)',
    'Object.values(a)'
  ],
  invalid: [
    {
      code: 'value.copyWithin(a);',
      errors: [methodError('copyWithin')]
    },
    {
      code: 'value.pop(a);',
      errors: [methodError('pop')]
    },
    {
      code: 'value.push(a);',
      errors: [methodError('push')]
    },
    {
      code: 'value.reverse(a);',
      errors: [methodError('reverse')]
    },
    {
      code: 'value.shift(a);',
      errors: [methodError('shift')]
    },
    {
      code: 'value.sort(a);',
      errors: [methodError('sort')]
    },
    {
      code: 'value.splice(a);',
      errors: [methodError('splice')]
    },
    {
      code: 'value.unshift(a);',
      errors: [methodError('unshift')]
    },
    {
      code: 'value.watch(a);',
      errors: [methodError('watch')]
    },
    {
      code: 'value.unwatch(a);',
      errors: [methodError('unwatch')]
    },
    {
      code: '_.sort(a)',
      errors: [methodError('sort')]
    },
    {
      code: 'value["push"](a)',
      errors: [methodError('push')]
    },
    {
      code: 'value["pop"](a)',
      errors: [methodError('pop')]
    },
    {
      code: 'value.push(a)',
      options: [{
        allowedObjects: ['foo']
      }],
      errors: [methodError('push')]
    },
    {
      code: 'R.sort(a)',
      options: [{
        allowedObjects: ['_']
      }],
      errors: [methodError('sort')]
    },
    {
      code: 'R.sort(a)',
      options: [{
        allowedObjects: ['ramda']
      }],
      errors: [methodError('sort')]
    },
    {
      code: 'R.foo().sort(a)',
      options: [{
        allowedObjects: ['R']
      }],
      errors: [methodError('sort')]
    },
    {
      code: 'R.foo.sort(a)',
      options: [{
        allowedObjects: ['R']
      }],
      errors: [methodError('sort')]
    },
    {
      code: 'foo().sort(a)',
      errors: [methodError('sort')]
    },
    {
      code: 'R().sort(a)',
      options: [{
        allowedObjects: ['R']
      }],
      errors: [methodError('sort')]
    },
    {
      code: 'Object.defineProperties(a)',
      errors: [objectError('defineProperties')]
    },
    {
      code: 'Object.defineProperty(a)',
      errors: [objectError('defineProperty')]
    },
    {
      code: 'Object.setPrototypeOf(a)',
      errors: [objectError('setPrototypeOf')]
    }
  ]
});
