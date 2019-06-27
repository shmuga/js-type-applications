import { applyAllOrdFunctions } from './utils.js'

String.prototype.lte = function(that) {
    return this.length <= that.length
}

applyAllOrdFunctions(String)