import daggy from 'daggy'

const { taggedSum } = daggy

export const Predicate = daggy.tagged('Predicate', ['f'])

// Make a Predicate that runs `f` to get
// from `b` to `a`, then uses the original
// Predicate function!
// contramap :: Predicate a ~> (b -> a)
//                          -> Predicate b
Predicate.prototype.contramap =
    function (f) {
        return Predicate(
            x => this.f(f(x))
        )
    }


