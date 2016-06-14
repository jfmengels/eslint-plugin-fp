'use strict';

module.exports = function (context) {
  return {
    ClassDeclaration: function (node) {
      context.report({
        node: node,
        message: 'Unallowed use of `class`. Use functions instead'
      });
    }
  };
};
