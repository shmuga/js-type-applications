import daggy from 'daggy'
import { List } from './daggy.js'
import { delimiter, logWith } from './utils.js'
const { tagged, taggedSum } = daggy
const log = logWith(v => eval(v))

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

// Check the lists' heads, then their tails
// equals :: Setoid a => List a ~> List a -> Bool
List.prototype.equals = function(that) {
    if (this.length() !== that.length()) {
        return  false
    }

    return this.cata({
        Cons: (head, tail) =>
            head === that.head
            && tail.equals(that.tail),
        Nil: () => List.is(List.Nil)
    })
}

List.prototype.notEquals = function(that) {
    return !this.equals(that)
}

Array.prototype.equals = function(that) {
    return this.every((el, key) => that[key] === el)
}

Boolean.prototype.equals = function(that) {
    return this === that
}

log(`List.from([1,2,3]).equals(List.from([1,2,3]))`)
log(`List.from([1,2,3]).notEquals(List.from([1,2,3,4]))`)

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


export const Set = taggedSum('Set', {

})

log(`isPalindrome(List.from([1,2,3,2,1]))`)