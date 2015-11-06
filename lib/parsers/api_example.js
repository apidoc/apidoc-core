var trim = require('../utils/trim');
var unindent = require('../utils/unindent');
var fs = require('fs');
var path = require('path');


function parse(content, source) {
    source = trim(source);

    var title = '';
    var text = '';
    var type;

    // Search for @apiExample "[{type}] title and content
    // /^(@\w*)?\s?(?:(?:\{(.+?)\})\s*)?(.*)$/gm;
    var parseRegExpFirstLine = /(@\w*)?(?:(?:\s*\{\s*([a-zA-Z0-9\.\/\\\[\]_-]+)\s*\}\s*)?\s*(.*)?)?/;
    var parseRegExpFollowing = /(^.*\s?)/gm;
    var cutFilePathRegExp = /\{[\s]?path.*\}/g;

    var matches;
    if ((matches = parseRegExpFirstLine.exec(source))) {
        type = matches[2];
        title = matches[3];
        if (title.replace(' ', '').indexOf('{path=') > -1) {
            var extFile = title.replace(' ', '').split('{path=')[1].split('}')[0];
            var currentDir = path.dirname(global.currentFile) + path.sep;
            text += fs.readFileSync(currentDir + extFile);
            text += '\n';
            title = title.replace(cutFilePathRegExp, '');
        }
    }

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
