var trim     = require('../utils/trim');
var unindent = require('../utils/unindent');

function parse(content) {
    var deprecated = trim(content);

    if (deprecated.length > 0) {
        var group = deprecated.split(' ')[0];
        group = group.charAt(0).toUpperCase() + group.slice(1);
        var name = deprecated.substr(deprecated.indexOf(' ') + 1);
        var url = name.replace(/(\s+)/g, '_').replace(/\'/g, '_');
        return {
            deprecated: {
                group: group,
                name: name,
                url: url
            }
        };
    }

    return {
        deprecated: {
            url: null
        }
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
