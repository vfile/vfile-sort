/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast-message-sort
 * @fileoverview mdast plug-in to sort messages by line/column.
 */

'use strict';

/**
 * Sort all `file`s messages by line/column.
 *
 * @private
 * @param {Node} node - Root node.
 * @param {File} file - Virtual file.
 */
function transformer(node, file) {
    file.messages.sort(function (a, b) {
        return a.line === undefined || a.line === null ?
            -1 :
            b.line === undefined || b.line === null ?
                1 :
                a.line - b.line || a.column - b.column;
    });
}

/**
 * Return `transformer`.
 *
 * @example
 *   mdast.use(attacher).process(doc, function (err, res, file) {
 *     console.log(file.messages)
 *   });
 *
 * @return {Function} - See `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
