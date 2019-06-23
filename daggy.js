import daggy from 'daggy'
import { logWith } from './utils.js'

const { tagged, taggedSum } = daggy
const log = logWith(v => eval(v))

const List = taggedSum('List', {
    Cons: ['head', 'tail'],
    Nil: []
})

List.from = function (xs) {
    return xs.reduceRight(
        (acc, x) => List.Cons(x, acc),
        List.Nil
    )
}

List.prototype.toArray = function() {
    return this.cata({
        Cons: (x, acc) => [
            x, ... acc.toArray()
        ],

        Nil: () => []
    })
}

List.prototype.map = function(f) {
    return this.cata({
        Cons: (x, acc) => List.Cons(f(x), acc.map(f)),

        Nil: () => List.Nil
    })
}

List.prototype.filter = function(f) {
    return this.cata({
      Cons: (x, xs) => f(x)
            ? List.Cons(x, xs.filter(f))
            : xs.filter(f),
      Nil: () => List.Nil
    })
}

List.prototype.reduce = function(acc, f) {
    return this.cata({
        Cons: (x, xs) => xs.reduce(f(acc, x), f),
        Nil: () => acc
    })
}

List.prototype.reduceRight = function(acc, f) {
    return this.cata({
        Cons: (x, xs) => f(xs.reduceRight(acc, f), x),
        Nil: () => acc
    })
}

List.prototype.toString = function() {
    return this.cata({
        Cons: (x, xs) => `Cons(${x}, ${xs.toString()})`,
        Nil: () => 'Nil'
    })
}

List.prototype.append = function(a) {
    return this.cata({
        Cons: (x, xs) => List.Cons(x, xs.append(a)),
        Nil: () => List.from([a])
    })
}

List.prototype.prepend = function(a) {
    return this.cata({
        Cons: (x, xs) => List.Cons(a, xs.prepend(x)),
        Nil: () => List.from([a])
    })
}

List.prototype.reverse = function() {
    return this.cata({
        Cons: (x, xs) => xs.reduceRight(
            List.Nil,
            (acc, x1) => acc.append(x1)
        ).append(x),
        Nil: () => List.Nil
    })
}

List.prototype.concat = function(another) {
    return this.cata({
        Cons: (x, xs) => xs.prepend(x).reduceRight(
            another,
            (acc, x) => acc.prepend(x)
        ),
        Nil: () => another
    })
}

List.prototype.flatten = function() {
    return this.cata({
        Cons: (x, xs) => List.is(x)
            ? x.flatten().concat(xs.flatten())
            : xs.flatten().prepend(x),
        Nil: () => List.Nil
    })
}

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