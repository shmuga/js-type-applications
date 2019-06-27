import { List } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

/**
 * Ord types are types with a total ordering. That means that, given any two
 * values of a given Ord type, you can determine whether one be greater than
 * the other. To do this, we actually only need one method. Given that all Ord
 * types must also be Setoid types, it could actually have been any of the
 * comparison operators (>, >=, <, <=; think about why any of these would have
 * worked), but the spec settled on <= (less-than-or-equal), which it refers
 * to as lte:
 *
 * lte :: Ord a => a ~> a -> Boolean
 */

log(`List.from([1,2,3]).lte(List.from([1,2,3]))`)
log(`List.from([3,2,3]).gt(List.from([2,2,3]))`)

/**
 * Given any two values of an Ord type it should follow next laws
 * a.lte(b) || b.lte(a) === true // Totality
 * a.lte(b) && b.lte(a) === a.equals(b) // Antisymmetry
 * a.lte(b) && b.lte(c) === a.lte(c) // Transitivity
 */

export function checkOrdLaws(a, b, c) {
    const law1 = a.lte(b) || b.lte(a)
    const law2 = a.lte(b) && b.lte(a) === a.equals(b)
    const law3 = a.lte(b) && b.lte(c)
        ? a.lte(c)
        : false

    console.log(`Checking Ord laws against ${a.constructor.name || a.constructor.toString()}`)
    delimiter()
    console.log(`Law 1. Totality
    
        a.lte(b) || b.lte(a) === true                   : ${law1}\n`)
    console.log(`Law 2. Antisymmetry
     
        a.lte(b) && b.lte(a) === a.equals(b)            : ${law2}\n`)
    console.log(`Law 3. transitivity
     
        if a.equals(b) and b.equals(c) then a.equals(c) : ${law3}\n`)
    console.log(`All laws are proved                                     : ${law1 && law2 && law3}`)
    console.log('---------------------------------------------------------------\n')
}

checkOrdLaws(List.from([1,2,3]), List.from([2,3,4]), List.from([3,4,5]))
checkOrdLaws(1, 2, 3)
checkOrdLaws([1, 2], [2, 3], [3, 4])