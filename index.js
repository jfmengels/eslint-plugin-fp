'use strict';

const reqAll = require('req-all');
const createIndex = require('create-eslint-index');

const rules = reqAll('rules', {camelize: false});

const externalRecommendedRules = {
  'no-var': 'error'
};

const internalRecommendedRules = createIndex.createConfig({
  plugin: 'fp',
  field: 'meta.docs.recommended'
}, rules);

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: Object.assign({}, internalRecommendedRules, externalRecommendedRules)
    }
  }
};
