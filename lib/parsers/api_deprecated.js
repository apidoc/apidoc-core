var trim     = require('../utils/trim');
var unindent = require('../utils/unindent');

function parse(content) {
  var deprecated = trim(content);

  if (deprecated.length > 0) {
    return {
      deprecated: {
        content: unindent(deprecated)
      }
    };
  }

  return {
    deprecated: true
  };
}

/**
 * Exports
 */
module.exports = {
  parse : parse,
  path  : 'local',
  method: 'insert',
  markdownFields: [ 'deprecated.content' ],
  markdownRemovePTags: [ 'deprecated.content' ]
};
