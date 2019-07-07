import daggy from 'daggy'
import { applyAllOrdFunctions } from './utils.js'

const { taggedSum } = daggy

export const Maybe = taggedSum('Maybe', {
    Just: ['x'],
    Nothing: []
})

Maybe.from = function(val) {
    if (val === undefined
        || val === null
    ) {
        return Maybe.Nothing
    }

    return Maybe.Just(val)
}

Maybe.prototype.equals = function(that) {
    return this.cata({
      Just: x => that.cata({
          Just: y => x.equals(y),
          Nothing: () => false
      }),
      Nothing: () => that.cata({
          Just: y => false,
          Nothing: () => true,
      })
    })
}

Maybe.prototype.map = function(f) {
    return this.cata({
        Just: (x) => Maybe.from(f(x)),
        Nothing: () => Maybe.Nothing
    })
}

Maybe.prototype.fold = function(d, f) {
    return this.cata({
        Just: (x) => f(x),
        Nothing: () => d
    })
}