'use strict';

module.exports = function (context) {
  function reportForLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `for` loop'
    });
  }

  function reportWhileLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `while` loop. Use recursion instead'
    });
  }

  return {
    ForStatement: reportForLoop,
    ForInStatement: reportForLoop,
    ForOfStatement: reportForLoop,

    WhileStatement: reportWhileLoop,
    DoWhileStatement: reportWhileLoop
  };
};
