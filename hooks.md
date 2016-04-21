# apiDoc Hooks


## parser-find-elements

Called on each found element. Returns a new list of elements (replace elements).
Used to inject annotationes from an external schema.

Parameter: `(elements, element, block, filename)`
 * {array}  elements Found elements in a block without the current element.
 * {array}  element  Contains the source, name (lowercase), sourceName (original), content.
 * {string} block    Current source block.
 * {string} filename Current filename.

File: `parser.js`
Function: `_findElements`



## parser-find-element-{name}

Called on each found element and returns the modified element.
Used to modify a specific element.

{name} is the found element.name (lowercase).

Parameter: `(element, block, filename)`
 * {array}  element  Contains the source, name (lowercase), sourceName (original), content.
 * {string} block    Current source block.
 * {string} filename Current filename.

File: `parser.js`
Function: `_findElements`
