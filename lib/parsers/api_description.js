var unindent = require('../utils/unindent');

function parse(content) {
    var description = str.trim(content);

    if (description.length === 0)
        return null;

    return {
        description: unindent(description)
    };
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'local',
    method        : 'insert',
    markdownFields: [ 'description' ]
};
