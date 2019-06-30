import daggy from 'daggy'
import { applyAllOrdFunctions } from './utils.js'

Number.prototype.equals = function(that) {
    return this === that
}

Number.prototype.lte = function(that) {
    return this <= that
}

applyAllOrdFunctions(Number)

export const Sum = daggy.tagged('Sum', ['val'])

Sum.prototype.equals = function(that) {
    return this.val.equals(that.val)
}

Sum.prototype.concat = function(that) {
    return Sum(this.val + that.val)
}

Sum.empty = function() {
    return Sum(0)
}

export const Max = daggy.tagged('Max', ['val'])

Max.prototype.equals = function(that) {
    return this.val.equals(that.val)
}

Max.prototype.concat = function(that) {
    return Max(Math.max(this.val, that.val))
}

Max.empty = function() {
    return Max(-Infinity)
}

export const Min = daggy.tagged('Min', ['val'])

Min.prototype.equals = function(that) {
    return this.val.equals(that.val)
}

Min.prototype.concat = function(that) {
    return Min(Math.min(this.val, that.val))
}

Min.empty = function() {
    return Min(Infinity)
}

export const Product = daggy.tagged('Product', ['val'])

Product.prototype.equals = function(that) {
    return this.val.equals(that.val)
}

Product.prototype.concat = function(that) {
    return Product(this.val * that.val)
}

Product.empty = function() {
    return Product(1)
}