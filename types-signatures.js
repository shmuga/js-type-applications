/**
 * equals :: Setoid a => a -> a -> Bool
 *
 * The => is new notation. What this means is that the signature to its right
 * is valid if all the conditions to its left are satisfied. In the case of equals,
 * the signature a -> a -> Bool is valid if a is a Setoid. Don’t worry about what
 * a Setoid is just yet, as we’ll be covering exactly what it means in the next
 * article. For now, just think of a Setoid as a type for which we can check
 * whether two of its values are equivalent.
 */

