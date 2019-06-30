import { applyAllOrdFunctions } from './utils.js'

String.prototype.equals = function(that) {
    return this === that
}

String.prototype.lte = function(that) {
    return this.length <= that.length
}

applyAllOrdFunctions(String)