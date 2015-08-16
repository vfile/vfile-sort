'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var VFile = require('vfile');
var sort = require('./index.js');

/*
 * Tests.
 */

describe('vfile-sort', function () {
    it('should work', function () {
        var file = new VFile();

        file.warn('Hotel', {
            'column': 0
        });

        file.warn('Foxtrot');

        file.warn('Alpha', {
            'line': 3
        });

        file.warn('Bravo', {
            'line': 3,
            'column': 1
        });

        file.warn('Charlie', {
            'line': 3,
            'column': 2
        });

        file.warn('Delta', {
            'line': 0,
            'column': 1
        });

        file.warn('Echo', {
            'column': 1
        });

        file.warn('Golf', {
            'line': 0
        });

        assert.deepEqual(sort(file).messages.map(String), [
            '1:1: Hotel',
            '1:1: Foxtrot',
            '1:1: Golf',
            '1:1: Delta',
            '1:1: Echo',
            '3:1: Alpha',
            '3:1: Bravo',
            '3:2: Charlie'
        ]);
    });
});
