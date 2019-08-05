import { Just, Nothing, Maybe } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * Applicative types are Apply types with one extra function,
 * which we define in Fantasy Land as of
 *
 * of :: Applicative f => a -> f a
 *
 * With of, we can take a value, and lift it into the given Applicative.
 * That’s it! In the wild, most Apply types you practically use will also be Applicative,
 * but we’ll go through a counter-example later on! Anyway, wouldn’t you know,
 * there are a few laws to go with it, tying ap and of together:
 */

export function checkApplicativeLaws(U, v, f, x) {
    const id = x => x
    const law1 = v.ap(U.of(x => x)).equals(v)

    const law2 = U.of(x).ap(U.of(f)).equals(U.of(f(x)))

    const law3 = U.of(x).ap(v).equals(v.ap(U.of(f => f(x))))

    console.log(`Checking Applicative laws against ${U['@@type'] || U.constructor.name || U.constructor.toString()}`)
    delimiter()
    console.log(`Law 1. Identity
    
        v.ap(A.of(x => x)) === v                                : ${law1}\n`)
    console.log(`Law 2. Homomorphism
     
        A.of(x).ap(A.of(f)) === A.of(f(x))                      : ${law2}\n`)

    console.log(`Law 3. Interchange
        A.of(x).ap(v) === v.ap(A.of(f => f(x))                  : ${law3}\n`)

    console.log(`All laws are proved                                     : ${law1 && law2 && law3}`)
    console.log('---------------------------------------------------------------\n')
}

checkApplicativeLaws(Maybe, Just(x => x), x => x, 1)
checkApplicativeLaws(Array, [x => x], x => x, 1)