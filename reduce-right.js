/**
 * http://www.tomharding.me/2017/02/24/reductio-and-abstract-em/
 *
 * What reduceRight actually is, formally, is a catamorphism: a way of folding
 * a type (in this case, a list) up into a value. The theory here is simple:
 * if you have access to all possible configurations of your structure, you can
 * do anything you like. If you don’t, you can’t!
 *
 * reduce vs reduceRight?
 * Given that you can indeed express reduceRight in terms of reduce, it might
 * seem odd to pick the less common one as a base operation. The answer lies in
 * lazy languages and infinities, and there are already plenty of lazy reduceRight
 * explanations online - you don’t need my poor attempt!
 *
 * For some further reading, catamorphisms are also called folds, which does
 * imply an unfold (an anamorphism - more wonderful names!), and Ramda’s unfold
 * function can show you exactly what that does. Think about a function that
 * produces a range - that’s unfolding a starting number into a list from 0 to
 * the number! Still, we can think of that as not being a list function because
 * it’s not a function on a list - it’s just a function that returns a list**.
 */
import { logWithStringify } from './utils.js'

const log = logWithStringify(v => eval(v))

const head = ([x, ... xs]) =>  x
const cons = ( x,     xs ) => [x, ...xs]
const add1 = a => a + 1

const map = (f, xs) => xs.reduceRight((acc, x) => cons(f(x), acc), [])

const filter = (p, xs) => xs.reduceRight(
    (acc, x) => p(x)
        ? cons(x, acc)
        : acc,
    []
)

const length = (xs) => xs.reduceRight(n => n + 1, 0)

log('length([1,2,3,4,5])')

const elemAt = (n, xs) => head(xs.reduceRight(
    ([e, c], x) => [n === c ? x : e, c - 1],
    [undefined, length(xs) - 1]
))

log('elemAt(2, [1, 2, 3, 4, 5])')

const reduce = (f, acc, xs) =>
    xs.reduceRight(
        (accF, x) => z => accF(f(z, x)),
        x => x
    )(acc)

const reduceRight = (f, acc, xs) => xs.reduceRight(f, acc)

/**
 *  [1,2,3,4].reduceRight(
 *    (accF, x) => z => accF((x, y) => x - y)(z, 5),
 *     v => v
 *  )(0)
 *
 *  [1,2,3].reduceRight(
 *    (accF, x) => z1 => accF(z1 - 4)
 *    z => ((x, y) => x - y)(z, 5),
 *    or
 *    z => z - 5
 *  )(0)
 *
 *  [1,2].reduceRight(
 *    (accF, x) => z2 => accF(z2 - 3),
 *    z1 => (z1 - 4) - 5
 *  )(0)
 *
 *  (z4 => ((((z5 - 1) - 2) -3) -4) -5)))(0)
 */

log('reduce((x, y) => x - y, 10, [1, 2, 3])')
log('reduce((x,y) => [x,y], [], [1, 2, 3, 4, 5])')
log('reduceRight((x,y) => [x,y], [], [1, 2, 3, 4, 5])')

