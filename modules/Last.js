import daggy from 'daggy'

export const Last = daggy.tagged('Last', ['val'])

Last.prototype.concat = function(that) {
    return that
}