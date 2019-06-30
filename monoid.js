/**
 * Well, a Monoid type is any Semigroup type that happens to have a special value
 * - we’ll call it an identity value - stored on the type as a function called empty.
 * Here’s its (in my opinion, not-too-helpful) signature:
 *
 * empty :: Monoid m => () -> m
 */
import { First, List, Sum, Max } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * Far more useful, I think, are the laws for how empty must act for a type to be
 * a valid Monoid. We call these the identity laws:
 *
 * Right and Left identity
 * MyType(x).concat(MyType.empty()) === MyType(x)
 * MyType.empty().concat(MyType(x)) === MyType(x)
 */

function checkMonoidLaw(Type, a) {
    const law1 = a.concat(Type.empty()).equals(a)
    const law2 = Type.empty().concat(a).equals(a)

    console.log(`Checking Monoid laws against ${a.constructor.name || a.constructor.toString()}`)
    delimiter()

    console.log(`Law 1. Right identity
    
        a.concat(Type.empty()) === a             : ${law1}\n`)

    console.log(`Law 2. Left identity
    
        Type.empty().concat(a) === a             : ${law2}\n`)
}

checkMonoidLaw(Array, [1,2,3])


/**
 * The fiddly part about monoids in JavaScript is that we have to pass in type
 * representations (what we called M). The Fantasy Land spec puts these in signatures
 * as TypeRep values, in case you’ve wondered what they were. These have to be here
 * because JavaScript, unlike other languages, can’t deduce the type we’re working
 * with, so we have to give it a friendly nudge.
 */

// A friendly neighbourhood monoid fold.
// fold :: Monoid m => (a -> m) -> [a] -> m
const fold = M => xs => xs.reduce(
    (acc, x) => acc.concat(M(x)),
    M.empty())

log(`fold(Sum)([1, 2, 3, 4, 5]).val`)
log(`fold(Max)([1, 2, 3, 4, 5]).val`)
