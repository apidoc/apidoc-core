/**
 * C#, Go, Dart, Java, JavaScript, PHP (all DocStyle capable languages)
 */
// find blocks between '/**' and '*/'
var cMultilineCommentsRegex = /\/\*\*\uffff?(.+?)\uffff?(?:\s*)?\*\//;

// find all contiguous blocks of single-line comments
var cSingleLineCommentsRegex = /(\/\/[^\uffff]+)(\uffff\s*\/\/[^\uffff]*)+/;

// combine multiline and single line blocks regular expressions
var cLikeCommentsRegex = new RegExp (
  '((' + cMultilineCommentsRegex.source + ')|(' + cSingleLineCommentsRegex.source + '))',
  'g'
);

module.exports = {
    docBlocksRegExp: cLikeCommentsRegex,
    // remove unneeded ' * ', tabs at the beginning and empty single-line comments
    // also remove lines with // followed by either '-' or more '/'
    inlineRegExp: /(^\s*((\*)[ ]?\/?))|(^\s*(\/\/\s*([-\/]{2,}))|(^\s*\/\/))/gm
};