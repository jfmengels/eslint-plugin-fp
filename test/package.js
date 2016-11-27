import fs from 'fs';
import test from 'ava';
import pify from 'pify';
import index from '../';

test('every rule should defined in the index file and recommended settings', async t => {
  const files = await pify(fs.readdir, Promise)('rules/');
  const rules = files.filter(file => file.indexOf('.js') === file.length - 3);

  rules.forEach(file => {
    const name = file.slice(0, -3);
    t.truthy(index.rules[name], `'${name}' is not exported in 'index.js'`);
    t.truthy(index.rules[name].meta.docs.description, `'${name}' does not have a description`);
    t.truthy(index.rules[name].meta.docs.recommended, `'${name}' does not have a recommended setting`);
    t.truthy(index.configs.recommended.rules[`fp/${name}`], `'${name}' is not set in the recommended config`);
  });

  t.is(Object.keys(index.rules).length, rules.length,
    'There are more exported rules than rule files.');
});

test('no-var should be turned on in the recommended settings', async t => {
  t.true(index.configs.recommended.rules['no-var'] === 'error');
});
