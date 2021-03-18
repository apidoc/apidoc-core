var trim = require('../utils/trim');

function parse(content) {
    var tags = trim(content);

    if (tags.length === 0)
        return null;

    tags = tags.split(',')

    tags = tags.map(function (tag) {
        return tag.replace(/_/g, ' ')
    })

    return {
        tags: tags
    };
}

/**
 * Exports
 */
module.exports = {
    parse: parse,
    path: 'local',
    method: 'insert'
};
