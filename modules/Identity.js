import daggy from 'daggy'

const { taggedSum } = daggy

export const Identity = daggy.tagged('Identity', ['x'])

// map :: Identity a ~> (a -> b)
//                   -> Identity b
Identity.prototype.map = function (f) {
    return new Identity(f(this.x))
}

// ap :: Identity a ~> Identity (a -> b)
//                  -> Identity b
Identity.prototype.ap = function (b) {
    return new Identity(b.x(this.x))
}

Identity.ap = function(x) {
    return new Identity(x)
}