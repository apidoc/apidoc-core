var trim = require('../utils/trim');

function parse(content) {
    var contentType = trim(content);

    if(contentType.length === 0)
        return null;

    return {
        contentType: contentType.replace(/(\s+)/g, '_')
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
