/**
 * Perl
 */
module.exports = {
    // find document blocks between '#**' and '#*'
    // or between '=pod' and '=cut'
    // or one of '=head1', '=head2', '=head3', '=head4', or '=item'
    //     instead of '=pod'
    docBlocksRegExp: /#\*\*\uffff?(.+?)\uffff?(?:\s*)?#\*|=(?:pod|head[1-4]|item)\uffff?(.+?)\uffff?(?:\s*)?=cut/g,
    // remove not needed ' # ' and tabs at the beginning
    inlineRegExp: /^(\s*)?(#)[ ]?/gm
};
