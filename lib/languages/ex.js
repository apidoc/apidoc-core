/**
 * Elixir
 */
module.exports = {
    // Find document blocks between '#{' and '#}'
    docBlocksRegExp: /\#*\{\uffff?(.+?)\uffff?(?:\s*)?\#+\}/g,
    // Remove not needed '#' and tabs at the beginning
    inlineRegExp: /^(\s*)?(\#*)[ ]?/gm
};
