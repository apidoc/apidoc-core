/**
 * Elixir
 */
module.exports = {
    // find document blocks between """ and """
    docBlocksRegExp: /@doc (~S)?\"\"\"\uffff?(.+?)\uffff?(?:\s*)?\"\"\"/g,
    // remove not needed tabs at the beginning
    inlineRegExp: /^(\t*)?/gm
};
