/**
 * Class should have both .equals and .lte functions implemented
 */
export function applyAllOrdFunctions(Class) {
    Class.prototype.gt = function(that) {
        return !this.lte(that)
    }

    Class.prototype.gte = function(that) {
        return this.gt(that) || this.equals(that)
    }

    Class.prototype.lt = function(that) {
        return !this.gte(that)
    }
}