import daggy from 'daggy'
import { applyAllOrdFunctions } from './utils.js'

Boolean.prototype.equals = function(that) {
    return this === that
}

Boolean.prototype.lte = function(that) {
    return this <= that
}

applyAllOrdFunctions(Boolean)


export const Any = daggy.tagged('Any', ['val'])

Any.prototype.concat = function(that) {
    return Any(this.val || that.val)
}

Any.empty = function() {
    return Any(false)
}

export const All = daggy.tagged('All', ['val'])

All.prototype.concat = function(that) {
    return All(this.val && that.val)
}

All.empty = function() {
    return All(true)
}
