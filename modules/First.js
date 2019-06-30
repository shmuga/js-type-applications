import daggy from 'daggy'

export const First = daggy.tagged('First', ['val'])

First.prototype.concat = function(that) {
    return this
}