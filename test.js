import assert from 'node:assert/strict'
import test from 'node:test'
import {VFile} from 'vfile'
import {sort} from './index.js'

test('sort', async function () {
  assert.deepEqual(
    Object.keys(await import('./index.js')).sort(),
    ['sort'],
    'should expose the public api'
  )

  let file = new VFile()

  file.message('Hotel', {line: 0, column: 0})
  file.message('Foxtrot')
  file.message('Alpha', {line: 3, column: 0})
  file.message('Bravo', {line: 3, column: 1})
  file.message('Charlie', {line: 3, column: 2})
  file.message('Delta', {line: 0, column: 1})
  file.message('Echo', {line: 0, column: 1})
  file.message('Golf', {line: 0, column: 0})
  file.message('Golf', {line: 0, column: 0})

  assert.deepEqual(
    sort(file).messages.map(String),
    [
      '1:1: Foxtrot',
      '1:1: Golf',
      '1:1: Golf',
      '1:1: Hotel',
      '1:1: Delta',
      '1:1: Echo',
      '3:1: Alpha',
      '3:1: Bravo',
      '3:2: Charlie'
    ],
    'should compare on line/column, reason'
  )

  file = new VFile()

  file.info('One', {line: 2, column: 5})
  file.message('Two', {line: 2, column: 5})

  try {
    file.fail('Three', {line: 2, column: 5})
  } catch {}

  assert.deepEqual(
    sort(file).messages.map(String),
    ['2:5: Three', '2:5: Two', '2:5: One'],
    'should compare on `fatal`'
  )
})
