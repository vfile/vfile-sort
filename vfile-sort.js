(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.vfileSort = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module vfile:sort
 * @fileoverview Sort VFile messages by line/column.
 */

'use strict';

/**
 * Compare a single property.
 *
 * @param {VFileMessage} a - Original.
 * @param {VFileMessage} b - Comparison.
 * @param {string} property - Property to compare.
 * @return {number}
 */
function check(a, b, property) {
    return (a[property] || 0) - (b[property] || 0);
}

/**
 * Comparator.
 *
 * @param {VFileMessage} a - Original.
 * @param {VFileMessage} b - Comparison.
 * @return {number}
 */
function comparator(a, b) {
    return check(a, b, 'line') || check(a, b, 'column') || -1;
}

/**
 * Sort all `file`s messages by line/column.
 *
 * @param {VFile} file - Virtual file.
 * @return {VFile} - `file`.
 */
function sort(file) {
    file.messages.sort(comparator);
    return file;
}

/*
 * Expose.
 */

module.exports = sort;

},{}]},{},[1])(1)
});