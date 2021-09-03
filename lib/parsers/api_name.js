function parse(content) {
    var name = content.trim();

    if(name.length === 0)
        return null;

    return {
        name: name.replace(/(\s+)/g, '_')
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
