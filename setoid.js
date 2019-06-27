import { List } from './modules/index.js'
import { delimiter, logWith } from './utils.js'
const log = logWith(v => eval(v))

log(`List.from([1,2,3]).equals(List.from([1,2,3]))`)
log(`List.from([1,2,3]).notEquals(List.from([1,2,3,4]))`)

/**
 * A setoid is any type with a notion of equivalence.
 * You already use plenty of setoids (integers, booleans, strings) almost
 * every time you use the == operator, so this shouldn’t be too tricky. You
 * also use things that aren’t setoids, like functions.
 *
 * equals :: Setoid a => a ~> a -> Boolean
 *
 * All the Fantasy Land structures come with laws that must be obeyed for the
 * instance to be valid, and Setoid is no exception. In order to make sure your
 * type behaves itself when used with other libraries and algorithms, there are
 * just three things we have to remember. In all cases:
 */

// checkSetoidLaws :: Setoid a => a -> a -> Bool
export function checkSetoidLaws(a, b, c) {
    const law1 = a.equals(a)
    const law2 = a.equals(b) === b.equals(a)
    const law3 = a.equals(b) && b.equals(c)
        ? a.equals(c)
        : false
    console.log(`Checking Setoid laws against ${a.constructor.name || a.constructor.toString()}`)
    delimiter()
    console.log(`Law 1. reflexivity
    
        a.equals(a)                                     : ${law1}\n`)
    console.log(`Law 2. symmetry or commutativity
     
        a.equals(b) === b.equals(a)                     : ${law2}\n`)
    console.log(`Law 3. transitivity
     
        if a.equals(b) and b.equals(c) then a.equals(c) : ${law3}\n`)
    console.log(`All laws are proved                                     : ${law1 && law2 && law3}`)
    console.log('---------------------------------------------------------------\n')
}

checkSetoidLaws(List.from([1,2,3]), List.from([1,2,3]), List.from([1,2,3]))
checkSetoidLaws([1,2,3], [1,2,3], [1,2,3])
checkSetoidLaws(true, true, true)

// isPalindrome :: List a -> boolean
function isPalindrome(list) {
    return list.reduceRight(
        List.Nil,
        (acc, x) => acc.append(x)
    ).equals(list)
}

log(`isPalindrome(List.from([1,2,3,2,1]))`)