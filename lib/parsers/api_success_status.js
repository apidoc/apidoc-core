var trim     = require('../utils/trim');
var unindent = require('../utils/unindent');

var group = '';

// Search: group, type, description
// Example: (200) {text/plain} Description content
//
// Naming convention:
//     b -> begin
//     e -> end
//     name -> the field value
//     oName -> wrapper for optional field
//     wName -> wrapper for field
var regExp = {
    b:               '^',                                   // start
    wStatus: {                                               // status code (group): (404)
        b:               '\\s*(?:\\(\\s*',                  // starting with '(', optional surrounding spaces
        group:              '(.+)',                        // 1
        e:               '\\s*\\)\\s*)?'                    // ending with ')', optional surrounding spaces
    },
    oType: {                                                // optional response type: {text/plain}, {empty}
        b:               '\\s*(?:\\{\\s*',                  // starting with '{', optional surrounding spaces
        type:                '([a-zA-Z0-9\(\)#:\\.\\/\\\\\\[\\]_-]+)', // 2
        e:               '\\s*\\}\\s*)?'                    // ending with '}', optional surrounding spaces
    },
    oDescription:         '(.*)?',                           // 3
    e:               '$|@'
};

function _objectValuesToString(obj) {
    var str = '';
    for (var el in obj) {
        if (typeof obj[el] === 'string')
            str += obj[el];
        else
            str += _objectValuesToString(obj[el]);
    }
    return str;
}

var parseRegExp = new RegExp(_objectValuesToString(regExp));

function parse(content) {
    content = trim(content);

    // replace Linebreak with Unicode
    content = content.replace(/\n/g, '\uffff');

    var matches = parseRegExp.exec(content);

    if ( ! matches)
        return null;

    group = matches[1];

    // Replace Unicode Linebreaks in description
    if (matches[3])
        matches[3] = matches[3].replace(/\uffff/g, '\n');

    return {
        group        : group,
        type         : matches[2],
        description  : unindent(matches[3] || '')
    };
}

function path() {
    return 'local.success.statuses.' + getGroup();
}

function getGroup() {
    return group;
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : path,
    method        : 'insert',
    getGroup      : getGroup,
    markdownFields: [ 'description', 'type' ],
    markdownRemovePTags: [ 'type' ]
};
