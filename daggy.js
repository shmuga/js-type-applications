import daggy from 'daggy'
import { logWith } from './utils.js'
import { List } from './modules/index.js'

const { tagged } = daggy
const log = logWith(v => eval(v))

/**
 * Daggy is a tiny library for creating sum types for functional programs.
 * Don’t worry about what that means too much for now, and focus on the two
 * functions that the library exports: tagged and taggedSum.
 */

//- A coordinate in 3D space.
//+ Coord :: (Int, Int, Int) -> Coord
export const Coord = tagged('Coord', ['x', 'y', 'z'])

//- A line between two coordinates.
//+ Line :: (Coord, Coord) -> Line
export const Line = tagged('Line', ['from', 'to'])

log('List.from([1,2,List.from([3])]).flatten().toArray()')
log('List.from([1,2,3]).concat(List.from([4,5,6])).toArray()')
log('List.from([1,2,3]).prepend(0).toArray()')
log('List.from([1,2,3]).reduceRight(List.Nil, (a,b) => List.from([a, b])).flatten().toArray()')
log('List.from([1,2,3]).reduceRight(List.Nil, (a,b) => List.from([a, b])).flatten().toArray()')
log('List.from([1,2,3]).reverse().toArray()')
log('List.from([1,2,3]).append(4).toString()')

log(`
List.from([1,2,3,4,5])
    .map(v => v + 1)
    .toString()
`)

log(`
List.from([1,2,3,4,5])
    .filter(v => v > 2)
    .toArray()
`)