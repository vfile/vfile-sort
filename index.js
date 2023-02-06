/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */

/** @type {Record<string, number>} */
const severities = {true: 2, false: 1, null: 0, undefined: 0}

/**
 * @template {VFile} File
 * @param {File} file
 * @returns {File}
 */
export function sort(file) {
  file.messages.sort(comparator)
  return file
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @returns {number}
 */
function comparator(a, b) {
  return (
    check(a, b, 'line') ||
    check(a, b, 'column') ||
    severities[String(b.fatal)] - severities[String(a.fatal)] ||
    compare(a, b, 'source') ||
    compare(a, b, 'ruleId') ||
    compare(a, b, 'reason') ||
    0
  )
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {'column' | 'line'} field
 * @returns {number}
 */
function check(a, b, field) {
  return (a[field] || 0) - (b[field] || 0)
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {'reason' | 'ruleId' | 'source'} field
 * @returns {number}
 */
function compare(a, b, field) {
  return String(a[field] || '').localeCompare(b[field] || '')
}
