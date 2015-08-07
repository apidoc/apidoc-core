// Same as @apiParam
var trim = require('../utils/trim');

function parse(content) {
    var tags = trim(content);

    if(tags.length === 0)
        return null;

    return {
        tags: tags.split(/[\s,]+/)
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