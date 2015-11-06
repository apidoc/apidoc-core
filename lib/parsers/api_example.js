var trim = require('../utils/trim');
var unindent = require('../utils/unindent');
var fs = require('fs');

function parse(content, source) {
    source = trim(source);

    var title = '';
    var text = '';
    var extFile = null;
    var type;

    // Search for @apiExample "[{type}] title and content
    // /^(@\w*)?\s?(?:(?:\{(.+?)\})\s*)?(.*)$/gm;
    var parseRegExpFirstLine = /(@\w*)?(?:(?:\s*\{\s*([a-zA-Z0-9\.\/\\\[\]_-]+)\s*\}\s*)?\s*(.*)?)?/;
    var parseRegExpFollowing = /(^.*\s?)/gm;

    var matches;
    if ((matches = parseRegExpFirstLine.exec(source))) {
        type = matches[2];
        title = matches[3];
        if (title.replace(' ', '').includes('{path=')) {
            extFile = title.replace(' ', '').split('{path=')[1].split('}')[0];
        }
    }

    text += fs.readFileSync(extFile);
    text += '\n';

    parseRegExpFollowing.exec(content); // ignore line 1
    while ((matches = parseRegExpFollowing.exec(source))) {
        text += matches[1];
    }

    if (text.length === 0)
        return null;

    return {
        title: title,
        content: unindent(text),
        type: type || 'json'
    };
}

/**
 * Exports
 */
module.exports = {
    parse: parse,
    path: 'local.examples',
    method: 'push'
};
