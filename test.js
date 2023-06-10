import assert from 'node:assert/strict'
import test from 'node:test'
import {fileURLToPath} from 'node:url'
import {VFile} from 'vfile'
import {VFileMessage} from 'vfile-message'
import {compareFile, compareMessage} from './index.js'

test('core', async function () {
  assert.deepEqual(
    Object.keys(await import('./index.js')).sort(),
    ['compareFile', 'compareMessage'],
    'should expose the public api'
  )
})

test('compareMessage', async function () {
  assert.deepEqual(
    [
      new VFileMessage('Hotel', {line: 0, column: 0}),
      new VFileMessage('Foxtrot'),
      new VFileMessage('Alpha', {line: 3, column: 0}),
      new VFileMessage('Bravo', {line: 3, column: 1}),
      new VFileMessage('Charlie', {line: 3, column: 2}),
      new VFileMessage('Delta', {line: 0, column: 1}),
      new VFileMessage('Echo', {line: 0, column: 1}),
      new VFileMessage('Golf', {line: 0, column: 0}),
      new VFileMessage('Golf', {line: 0, column: 0})
    ]
      .sort(compareMessage)
      .map(String),
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

  const one = new VFileMessage('One', {line: 2, column: 5})
  const two = new VFileMessage('Two', {line: 2, column: 5})
  const three = new VFileMessage('Three', {line: 2, column: 5})
  two.fatal = false
  three.fatal = true

  assert.deepEqual(
    [one, two, three].sort(compareMessage).map(String),
    ['2:5: Three', '2:5: Two', '2:5: One'],
    'should compare on `fatal`'
  )
})

test('compareFile', async function () {
  assert.deepEqual(
    [
      new VFile(),
      new VFile(new URL(import.meta.url)),
      new VFile(new URL('.', import.meta.url)),
      new VFile(new URL('readme.md', import.meta.url)),
      new VFile(new URL('.github/', import.meta.url)),
      new VFile(new URL('.github/workflows/', import.meta.url)),
      new VFile(new URL('.github/workflows/main.yml', import.meta.url)),
      new VFile(new URL('node_modules', import.meta.url)),
      new VFile(new URL('node_modules/', import.meta.url)),
      new VFile(new URL('lib/', import.meta.url)),
      new VFile(new URL('lib/index.js', import.meta.url))
    ]
      .sort(compareFile)
      .map((d) => d.path),
    [
      undefined,
      fileURLToPath(new URL('.', import.meta.url)),
      fileURLToPath(new URL('.github/', import.meta.url)),
      fileURLToPath(new URL('.github/workflows/', import.meta.url)),
      fileURLToPath(new URL('.github/workflows/main.yml', import.meta.url)),
      fileURLToPath(new URL('lib/', import.meta.url)),
      fileURLToPath(new URL('lib/index.js', import.meta.url)),
      fileURLToPath(new URL('node_modules', import.meta.url)),
      fileURLToPath(new URL('node_modules/', import.meta.url)),
      fileURLToPath(new URL('readme.md', import.meta.url)),
      fileURLToPath(new URL(import.meta.url))
    ],
    'should compare on `path`'
  )
})
