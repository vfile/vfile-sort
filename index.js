/**
 * @typedef {import('vfile').VFile} VFile
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */

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
    severities[b.fatal] - severities[a.fatal] ||
    compare(a, b, 'source') ||
    compare(a, b, 'ruleId') ||
    compare(a, b, 'reason') ||
    0
  )
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {string} field
 * @returns {number}
 */
function check(a, b, field) {
  return (a[field] || 0) - (b[field] || 0)
}

/**
 * @param {VFileMessage} a
 * @param {VFileMessage} b
 * @param {string} field
 * @returns {number}
 */
function compare(a, b, field) {
  return String(a[field] || '').localeCompare(b[field] || '')
}
