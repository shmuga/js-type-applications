import daggy from 'daggy'
import { alphabet } from '../utils.js'

export const TupleN = n => {
    const letters = alphabet.slice(0, n).split('')
    const Class = daggy.tagged(`Tuple${n}`, letters)

    // concat :: (Semigroup a, Semigroup b) => Tuple a b ~> Tuple a b -> Tuple a b
    Class.prototype.concat = function(that) {
        return Class(
            ...letters.map(letter => this[letter].concat(that[letter]))
        )
    }
    return Class
}

export const Tuple = TupleN(2)
export const Tuple3 = TupleN(3)
export const Tuple4 = TupleN(4)
export const Tuple5 = TupleN(5)
export const Tuple6 = TupleN(6)