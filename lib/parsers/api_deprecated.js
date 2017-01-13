var trim     = require('../utils/trim');

function parse(content) {
    var deprecated = trim(content);
    var url, text, name, group;

    //  if i have arguments
    if (deprecated.length > 0) {
         // if i have (#group:name) argunents
        if (deprecated.search(/\(#(.*):(.*)\)/) >= 0) {
            var groupName = deprecated.substring(deprecated.search(/\(#(.*):(.*)\)/) + 2, deprecated.length - 1);
            group = groupName.split(':')[0];
            group = group.charAt(0).toUpperCase() + group.slice(1);
            name = groupName.split(':')[1];
            url = group + '-' + name.replace(/(\s+)/g, '_').replace(/\'/g, '_');
            deprecated = deprecated.substring(0, deprecated.search(/\(#(.*):(.*)\)/));
        }
        text = trim(deprecated);
    }

    return {
        deprecated: {
            url: url,
            text: text,
            name: name,
            group: group
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
