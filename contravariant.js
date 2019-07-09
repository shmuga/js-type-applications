import { Predicate } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * -- Functor (covariant functor)
 * map :: f a ~> (a -> b) -> f b
 *
 * -- Contravariant
 * contramap :: f a ~> (b -> a) -> f b
 */


    // isEven :: Predicate Int
const isEven = Predicate(x => x % 2 === 0)

// Take a string, run .length, then isEven.
// lengthIsEven :: Predicate String
const lengthIsEven =
    isEven.contramap(x => x.length)

log(`lengthIsEven.f('123')`)
log(`lengthIsEven.f('1234')`)

