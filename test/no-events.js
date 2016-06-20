import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-events';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-events',
  message: 'Unallowed use of `events`'
};

ruleTester.run('no-events', rule, {
  valid: [
    'import foo from "foo"',
    'import {bar} from "foo"',
    'import events from "eventsE"',
    'import events from "Eevents"',
    'require("foo");',
    'require("eventsE");',
    'require("Efoo");',
    'var events;'
  ],
  invalid: [
    {
      code: 'import EventEmitter from "events";',
      errors: [error]
    },
    {
      code: 'import {listen} from "events";',
      errors: [error]
    },
    {
      code: 'require("events");',
      errors: [error]
    }
  ]
});
