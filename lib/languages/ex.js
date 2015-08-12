/**
 * Elixir
 */
module.exports = {
    // find document blocks between '#**' and '#*'
    docBlocksRegExp: /#\*\*\uffff?(.+?)\uffff?(?:\s*)?#\*/g,

    inlineRegExp: /^(\s*)?(#)[ ]?/gm
};
