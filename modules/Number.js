import { applyAllOrdFunctions } from './utils.js'

Number.prototype.equals = function(that) {
    return this === that
}

Number.prototype.lte = function(that) {
    return this <= that
}

applyAllOrdFunctions(Number)