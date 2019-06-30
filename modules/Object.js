import ramda from 'ramda'

Object.prototype.equals = function(that) {
    return ramda.equals(this, that)
}

Object.empty = function() {
    return {}
}