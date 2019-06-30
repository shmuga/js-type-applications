import daggy from 'daggy'
import { applyAllOrdFunctions } from './utils.js'

const { taggedSum } = daggy

export const List = taggedSum('List', {
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

List.prototype.length = function() {
    return this.cata({
        Cons: (head, tail) => 1 + tail.length(),
        Nil: () => 0
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

// Check the lists' heads, then their tails
// equals :: Setoid a => List a ~> List a -> Bool
List.prototype.equals = function(that) {
    return this.cata({
        Cons: (head, tail) =>
            that.cata({
                Cons: (head_, tail_) => head === head_ && tail.equals(tail_),
                Nil: () => false
            }),
        Nil: () => that.cata({
            Cons: () => false,
            Nil: () => true
        })
    })
}

List.prototype.notEquals = function(that) {
    return !this.equals(that)
}

List.prototype.lte = function(that) {
    return this.cata({
        Cons: (head, tail) => that.cata({
            Cons: (head_, tail_) => head.equals(head_)
                ? tail.lte(tail_)
                : head.lte(head_),
            Nil: () => false
        }),
        Nil: () => true
    })
}

List.empty = function() {
    return List.Nil
}

applyAllOrdFunctions(List)