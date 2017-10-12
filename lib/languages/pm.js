/**
 * Perl
 */
module.exports = {
    // find document blocks between '#**' and '#*'
    // or between '=pod' and '=cut'
    docBlocksRegExp: /#\*\*\uffff?(.+?)\uffff?(?:\s*)?#\*|=(?:pod|head[1-4]|item)\uffff?(.+?)\uffff?(?:\s*)?=cut/g,
    // remove not needed ' # ' and tabs at the beginning
    inlineRegExp: /^(\s*)?(#)[ ]?/gm
};
