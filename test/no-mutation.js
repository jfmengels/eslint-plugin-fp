import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-mutation';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = message => ({
  ruleId: 'no-mutation',
  message
});
const reassignmentError = error('Unallowed reassignment');
const incrementError = error('Unallowed use of `++` operator');
const decrementError = error('Unallowed use of `--` operator');
const commonJsError = error('Unallowed reassignment. You may want to activate the `commonjs` option for this rule');

ruleTester.run('no-mutation', rule, {
  valid: [
    'var a = 2;',
    'let a = 2;',
    'const a = 2;',
    'function foo(a={}) {}',
    {
      code: 'exports = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'exports.foo = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'exports.foo.bar = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'module.exports = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'module.exports.foo = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'module.exports.foo.bar = {};',
      options: [{commonjs: true}]
    },
    {
      code: 'foo.bar = {};',
      options: [{exceptions: [
        {object: 'foo', property: 'bar'}
      ]}]
    },
    {
      code: 'foo.bar = {};',
      options: [{exceptions: [
        {object: 'foo'}
      ]}]
    },
    {
      code: 'baz.propTypes = {};',
      options: [{exceptions: [
        {property: 'propTypes'}
      ]}]
    },
    {
      code: 'module.exports = {};',
      options: [{exceptions: [
        {object: 'module', property: 'exports'}
      ]}]
    },
    {
      code: 'module.exports[foo].bar = {};',
      options: [{exceptions: [
        {object: 'module', property: 'exports'}
      ]}]
    },
    {
      code: 'module.exports.foo = {};',
      options: [{exceptions: [
        {object: 'foo', property: 'bar'},
        {object: 'module', property: 'exports'}
      ]}]
    },
    {
      code: 'foo.bar = {};',
      options: [{exceptions: [
        {object: 'foo', property: 'bar'},
        {object: 'module', property: 'exports'}
      ]}]
    },
    {
      code: 'this.foo = 100;',
      options: [{allowThis: true}]
    },
    {
      code: 'this.foo.bar = 100;',
      options: [{allowThis: true}]
    },
    {
      code: 'function bar() { this.foo = 100; }',
      options: [{allowThis: true}]
    }
  ],
  invalid: [
    {
      code: 'a = 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a += 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a -= 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a *= 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a /= 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a %= 2;',
      errors: [reassignmentError]
    },
    {
      code: 'a++;',
      errors: [incrementError]
    },
    {
      code: '++a;',
      errors: [incrementError]
    },
    {
      code: 'a--;',
      errors: [decrementError]
    },
    {
      code: '--a;',
      errors: [decrementError]
    },
    {
      code: 'function foo(a) { a = a || {}; }',
      errors: [reassignmentError]
    },
    {
      code: 'module.foo = {};',
      errors: [reassignmentError]
    },
    {
      code: 'foo.exports = {};',
      errors: [reassignmentError]
    },
    {
      code: 'exports = {};',
      errors: [commonJsError]
    },
    {
      code: 'exports.foo = {};',
      errors: [commonJsError]
    },
    {
      code: 'exports.foo.bar = {};',
      errors: [commonJsError]
    },
    {
      code: 'exports[foo] = {};',
      errors: [commonJsError]
    },
    {
      code: 'exports.foo[bar] = {};',
      errors: [commonJsError]
    },
    {
      code: 'exports[foo].bar = {};',
      errors: [commonJsError]
    },
    {
      code: 'module.exports = {};',
      errors: [commonJsError]
    },
    {
      code: 'module.exports.foo = {};',
      errors: [commonJsError]
    },
    {
      code: 'module.exports[foo] = {};',
      errors: [commonJsError]
    },
    {
      code: 'module.exports.foo[bar] = {};',
      errors: [commonJsError]
    },
    {
      code: 'module.exports[foo].bar = {};',
      errors: [commonJsError]
    },
    {
      code: 'foo.bar = {};',
      options: [{exceptions: [
        {object: 'foo', property: 'boo'}
      ]}],
      errors: [reassignmentError]
    },
    {
      code: 'baz.propTypes = {};',
      options: [{exceptions: [
        {object: 'foo'}
      ]}],
      errors: [reassignmentError]
    },
    {
      code: 'baz.propTypes = {};',
      options: [{exceptions: [
        {property: 'props'}
      ]}],
      errors: [reassignmentError]
    },
    {
      code: 'baz.propTypes = {};',
      options: [{exceptions: [{}]}],
      errors: [reassignmentError]
    },
    {
      code: 'this.foo = 100;',
      errors: [reassignmentError]
    },
    {
      code: 'this.foo.bar = 100;',
      errors: [reassignmentError]
    },
    {
      code: 'function bar() { this.foo = 100; }',
      errors: [reassignmentError]
    }
  ]
});
