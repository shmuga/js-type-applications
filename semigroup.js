import daggy from 'daggy'
import { List, Sum, Max, Min, Tuple, Any, TupleN, Tuple4, First } from './modules/index.js'
import { delimiter, logWith,  alphabet} from './utils.js'
const log = logWith(v => eval(v))

/**
 * Now, just as with Setoid, we’ll get methods and laws out the way now so that we
 * can move on to fun things. Luckily, there’s only one of each! A valid Semigroup
 * must have a concat method with the following signature:
 *
 * concat :: Semigroup a => a ~> a -> a
 */

log(`''.concat('123')`)


/**
 * The only law we have to worry about here is associativity:
 * a.concat(b).concat(c) === a.concat(b.concat(c))
 */
function checkSemigroupLaw(a, b, c) {
    const law1 = (a.concat(b).concat(c)).equals(a.concat(b.concat(c)))

    console.log(`Checking Semigroup laws against ${a.constructor.name || a.constructor.toString()}`)
    delimiter()

    console.log(`Law 1. Associativity
    
        a.concat(b).concat(c) === a.concat(b.concat(c))             : ${law1}\n`)
}

checkSemigroupLaw(List.from([]), List.from([1]), List.from([2]))
checkSemigroupLaw(Sum(1), Sum(2), Sum(3))
checkSemigroupLaw(Max(1), Max(2), Min(3))
checkSemigroupLaw('1', '2', '3')

// Returns Tuple(Sum(3), Any(true))
log(`Tuple(Sum(1), Any(false)).concat(Tuple(Sum(2), Any(true))).toString()`)

const Customer = daggy.tagged('Customer', [
    'name',             // String
    'favouriteThings',  // [String]
    'registrationDate', // Int -- since epoch
    'hasMadePurchase'   // Bool
])

const concatStrategy = {
    to: customer =>  Tuple4(
        First(customer.name),
        customer.favouriteThings,
        Min(customer.registrationDate),
        Any(customer.hasMadePurchase)
    ),
    from: ({ a, b, c, d }) => Customer(a.val, b, c.val, d.val)
}

const merge = strategy => a => b => strategy.from(
    strategy.to(a).concat(strategy.to(b))
)

log(`merge(concatStrategy)
    (Customer('Mark', [], 0, false))
    (Customer('Mark', ['lol'], 4, true))`)


// could be refactored when customers is a monoid
const mergeMany = strategy => initial =>
    customers => customers.reduce(
        merge(strategy), initial
    )