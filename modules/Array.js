import { applyAllOrdFunctions } from './utils.js'

Array.prototype.equals = function(that) {
    return this.every((el, key) => that[key] === el)
}

Array.prototype.lte = function(that) {
    return this.every((el, key) => el <= that[key])
}

Array.empty = function() {
    return []
}

Array.from = function(val) {
    return [val]
}

applyAllOrdFunctions(Array)