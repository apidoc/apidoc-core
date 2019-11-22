var trim = require('../utils/trim');

function parse(content) {
    content = trim(content);

    return content;
}

/**
 * Exports
 */
module.exports = {
    parse : parse,
    path  : 'local',
    method: 'insert'
};
