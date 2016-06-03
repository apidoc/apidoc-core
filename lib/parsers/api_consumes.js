var trim     = require('../utils/trim');
var unindent = require('../utils/unindent');

function parse(content) {
    var consumesType = trim(content);

    if (consumesType.length === 0)
        return null;

    return unindent(consumesType);
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'local.consumes',
    method        : 'push',
    markdownFields: [ 'consumes' ]
};
