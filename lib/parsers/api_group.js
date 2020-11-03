var trim = require('../utils/trim');

function parse(content) {
    var group = trim(content);

    if (group.length === 0)
        return null;

    return {
        group: group.replace(/(\s+)/g, '_')
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
