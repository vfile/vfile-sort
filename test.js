import test from 'tape'
import {VFile} from 'vfile'
import {sort} from './index.js'

test('sort()', function (t) {
  let file = new VFile()

  // @ts-expect-error runtime.
  file.message('Hotel', {column: 0})
  file.message('Foxtrot')
  // @ts-expect-error runtime.
  file.message('Alpha', {line: 3})
  file.message('Bravo', {line: 3, column: 1})
  file.message('Charlie', {line: 3, column: 2})
  file.message('Delta', {line: 0, column: 1})
  // @ts-expect-error runtime.
  file.message('Echo', {column: 1})
  // @ts-expect-error runtime.
  file.message('Golf', {line: 0})
  // @ts-expect-error runtime.
  file.message('Golf', {line: 0})

  t.deepEqual(sort(file).messages.map(String), [
    '1:1: Foxtrot',
    '1:1: Golf',
    '1:1: Golf',
    '1:1: Hotel',
    '1:1: Delta',
    '1:1: Echo',
    '3:1: Alpha',
    '3:1: Bravo',
    '3:2: Charlie'
  ])

  file = new VFile()

  file.info('One', {line: 2, column: 5})
  file.message('Two', {line: 2, column: 5})

  try {
    file.fail('Three', {line: 2, column: 5})
  } catch {}

  t.deepEqual(sort(file).messages.map(String), [
    '2:5: Three',
    '2:5: Two',
    '2:5: One'
  ])

  t.end()
})
