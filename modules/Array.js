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

Array.prototype.ap = function (fs) {
    return [].concat(... fs.map(
        f => this.map(f)
    ))
}

Array.of = function(x) {
    return [x]
}

applyAllOrdFunctions(Array)