'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var sort = require('./index.js');
var mdast = require('mdast');
var assert = require('assert');

/*
 * Fixture
 */

var doc = [
    '# Foo bar baz',
    '',
    '*    Hello',
    '',
    '1.   World',
    '',
    '>  Alpha',
    ''
].join('\n');

/**
 * Example plug-in which warns.
 *
 * @return {Function}
 */
function warn() {
    /**
     * Warn for the first and last child of each node
     * in `ast`. Also, warn without nodes initially and
     * finally.
     *
     * @param {Node} ast - Document.
     * @param {File} file - Virtual file.
     */
    return function (ast, file) {
        file.warn('a');

        ast.children.concat().reverse().forEach(function (child, index) {
            var children = child.children;

            file.warn(index + ' start', children[0]);
            file.warn(index + ' end', children[children.length - 1]);
        });

        file.warn('b');
    };
}

/*
 * Tests.
 */

describe('mdast-message-sort', function () {
    it('should work', function (done) {
        mdast.use(warn).use(sort).process(doc, function (err, file) {
            var messages = file.messages.map(String);

            done(err);

            assert.deepEqual(messages, [
                '1:1: a',
                '1:1: b',
                '1:3-1:14: 3 start',
                '1:3-1:14: 3 end',
                '3:1-3:11: 2 start',
                '3:1-3:11: 2 end',
                '5:1-5:11: 1 start',
                '5:1-5:11: 1 end',
                '7:3-7:9: 0 start',
                '7:3-7:9: 0 end'
            ]);
        });
    });
});
