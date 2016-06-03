var trim     = require('../utils/trim');
var unindent = require('../utils/unindent');

function parse(content) {
    var producesType = trim(content);

    if (producesType.length === 0)
        return null;

    return unindent(producesType);
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'local.produces',
    method        : 'push',
    markdownFields: [ 'produces' ]
};
