import { Identity, Just, Nothing } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * ap :: Apply f => f a ~> f (a -> b) -> f b
 *
 * function apply     a ->   (a -> b) ->   b
 *
 * It says that, just as map could only apply a function to the wrapped value,
 * ap can only apply a wrapped function to the wrapped value. No magic tricks!
 */

// lift2 :: Applicative f
//       =>  (a ->   b ->   c)
//       -> f a -> f b -> f c
const lift2 = f => a => b =>
    // f a .map (a -> b -> ->c) = f (b -> c)
    // f b .ap f (b -> c) = f c
    b.ap(a.map(f))

// lift2F :: Functor f
//        => (  a ->   b ->      c)
//        ->  f a -> f b -> f (f c)
const lift2F = f => as => bs =>
    as.map(a => bs.map(b => f(a)(b)))

log(`
    Identity(3).ap(Identity(4).ap(Identity(x => y => y + x + 1))).toString()
`)

log(`lift2F(x => y => x + y)
    (Identity(2))
    (Identity(3)).toString()`)

log(`lift2(x => y => x + y)
    (Identity(2))
    (Identity(3)).toString()`)

log(`lift2(x => y => x + y)
    ([1,2,3])
    ([2,3,4])`)

log(`Just(4).ap(Just(x => x + 5)).toString()`)