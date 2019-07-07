import { List, Maybe } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * Functor is just another typeclass (a structure just like Semigroup or Monoid)
 * with one special method:
 *
 * map :: Functor f => f a ~> (a -> b) -> f b
 *
 * … and (surprise!) a couple of laws. For any functor value u,
 * the following must be true:
 *
 * Identity
 * u.map(x => x) === u
 *
 * Composition:
 * u.map(f).map(g) === u.map(x => g(f(x)))
 *
 * we start introducing Functor types:
 * a	Represent a value.
 * Maybe a	Represent a possibly null value.
 * Either e a	Represent a value or exception.
 * Array a	Represent a number of values.
 * x -> a	Represent a mapping to values.
 */

export function checkFunctorLaws(U, x, f, g) {
    const id = x => x
    const law1 = U.from(x).map(id).equals(U.from(id(x)))

    const law2 = U.from(x).map(g).map(f)
        .equals(U.from(x).map(x => f(g(x))))

    console.log(`Checking Functor laws against ${U['@@type'] || U.constructor.name || U.constructor.toString()}`)
    delimiter()
    console.log(`Law 1. Identity
    
        u.map(x => x) === u                                     : ${law1}\n`)
    console.log(`Law 2. Composition
     
        u.map(f).map(g) === u.map(x => g(f(x)))                 : ${law2}\n`)
    console.log(`All laws are proved                                     : ${law1 && law2}`)
    console.log('---------------------------------------------------------------\n')
}

checkFunctorLaws(Array, 1, x => x + 1, x => x + 2)
checkFunctorLaws(Maybe, 1, x => x + 1, x => x.toString())

const map = f => xs => xs.map(f)

log(`
Maybe.Just({ some: 'prop' })
    .map(x => x.other_prop)
    .map(x => x.toString())
    .map(x => x.match(/3/))
    .map(x => x + 10)
    .fold(15, x => x)
    .toString()
`)