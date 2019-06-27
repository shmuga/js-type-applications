import { applyAllOrdFunctions } from './utils.js'

Boolean.prototype.equals = function(that) {
    return this === that
}

Boolean.prototype.lte = function(that) {
    return this <= that
}

applyAllOrdFunctions(Boolean)