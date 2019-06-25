import { List } from './daggy.js';
import { logWith } from './utils.js';
const log = logWith(v => eval(v))

// Check the lists' heads, then their tails
// equals :: Setoid a => [a] ~> [a] -> Bool
List.prototype.equals = function(that) {
    return this.cata({
        Cons: (head, tail) => head === that.head
            && tail.equals(that.tail),
        Nil: () => that.is(List.Nil)
    });
}

log(`List.from([1,2,3]).equals(List.from([1,2,3]))`)