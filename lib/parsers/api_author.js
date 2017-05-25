// Same as @apiParam
var trim = require('../utils/trim');

function parse(content) {
    var author = trim(content);

    if(author.length === 0)
        return null;

    return {
        author: author.split(/[\s,]+/)
    };
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'local',
    method        : 'insert'
};