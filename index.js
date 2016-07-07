'use strict';

const reqAll = require('req-all');

const rules = reqAll('rules', {camelize: false});

const externalRecommendedRules = [
  ['no-var', 'error']
];

const recommendedRules = Object.keys(rules)
  .map(key => [[`fp/${key}`], rules[key].meta.docs.recommended])
  .concat(externalRecommendedRules)
  .reduce((res, item) => {
    res[item[0]] = item[1];
    return res;
  }, {});

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules
    }
  }
};
