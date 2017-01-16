var trim = require('../utils/trim');

function parse(content) {
    var tagFilter = trim(content);

    if(tagFilter.length === 0)
        return null;

    return {
        tagFilter: tagFilter
    };
}

/**
 * Exports
 */
module.exports = {
    parse : parse,
    path  : 'local',
    method: 'insert'
};
