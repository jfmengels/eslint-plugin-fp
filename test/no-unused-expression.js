import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-unused-expression';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-unused-expression',
  message: 'Unused expression'
};

ruleTester.run('no-unused-expression', rule, {
  valid: [
    'const a = 1 + 2;',
    'function foo() {}',
    'const foo = () => {}',
    'function foo(a, b) { return a + b; }',
    'const foo = (a, b) => a + b;',
    'a = 1;',
    'export function foo(x) { return x * x; }',
    'export default () => {};',
    'export const a = 1, b = 2;',
    'const a = 1; const b = 2;',
    'export const a = 1;',
    'delete foo.bar',
    '--foo',
    '++foo',
    'foo--',
    'foo++',
    'class MyClass extends SuperClass { constructor(arg) { super(arg) } }',
    {
      code: '"use strict";',
      options: [{allowUseStrict: true}]
    },
    {
      code: 'function foo() { "use strict"; return 2; }',
      options: [{allowUseStrict: true}]
    }
  ],
  invalid: [
    {
      code: 'foo;',
      errors: [error]
    },
    {
      code: '[];',
      errors: [error]
    },
    {
      code: '1 + 2;',
      errors: [error]
    },
    {
      code: 'foo()',
      errors: [error]
    },
    {
      code: '1, 2;',
      errors: [error]
    },
    {
      code: '(1, 2);',
      errors: [error]
    },
    {
      code: 'var a = (1, 2);',
      errors: [error]
    },
    {
      code: 'a = (1, 2);',
      errors: [error]
    },
    {
      code: 'a = 1, 2;',
      errors: [error]
    },
    {
      code: '[].forEach(function() {})',
      errors: [error]
    },
    {
      code: 'function foo(a, b) { a + b; }',
      errors: [error]
    },
    {
      code: '"use strict";',
      errors: [error]
    },
    {
      code: 'function foo() { "use strict"; return 2; }',
      errors: [error]
    },
    {
      code: [
        'class MyClass extends SuperClass {',
        '  constructor(arg) {',
        '    super(arg);',
        '    super.method();',
        '  }',
        '}'
      ].join('\n'),
      errors: [error]
    }
  ]
});
