/**
 * Ruby
 */
module.exports = {
    // find document blocks between '=begin' and '=end'
    docBlocksRegExp: /\=begin\uffff?(.+?)\uffff?(?:\s*)?\=end/g,
    // remove not needed tabs at the beginning
    inlineRegExp: /^(\t*)?/gm
};
