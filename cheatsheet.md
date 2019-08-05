## <a id="setoid">Setoid</a>

__Prototype__

`equals :: Setoid a => a ~> a -> Boolean`

__Laws__
1. [Reflexivity](#reflexivity)
2. [Symmetry/commutativity](#symmetry)
3. [Transitivity](#transitivity)

## <a id="ord">Ord</a>

__Prototype__

`lte :: Ord a => a ~> a -> Boolean`

__Laws__
1. [Totality](#totality)
2. [Antisymmetry](#antisymmetry)
3. [Transitivity](#transitivity)

## <a id="semigroup">Semigroup</a>
__Prototype__

`concat :: Semigroup a => a ~> a -> a`

__Laws__
1. [Associativity](#associativity) 

## <a id="monoid">Monoid</a>

__Prototype__

[[Semigroup](#semigroup)] +

`empty :: Monoid m => () -> m`

__Laws__
1. Right identity: 
`MyType(x).concat(MyType.empty()) === MyType(x)`
2. Left identity:
`MyType.empty().concat(MyType(x)) === MyType(x)`

## <a id="functor">Functor</a>
__Prototype__

`map :: Functor f => f a ~> (a -> b) -> f b`

__Laws__
1. [Identity](#identity)
2. [Composition](#composition)

## <a id="contravariant">Contravariant</a>
__Prototype__

`contramap :: f a ~> (b -> a) -> f b`

__Laws__
1. [Identity](#identity)
2. [Composition](#composition)

## <a id="apply">Apply</a>
__Prototype__

`ap :: Apply f => f a ~> f (a -> b) -> f b`

__Laws__
1. [Identity](#identity)
2. [Composition](#composition)

## <a id="applicative">Applicative</a>
__Prototype__ 
[[Apply](#apply)] +  

`of :: Applicative f => a -> f a`

__Laws__
1. [Identity](#identity)
2. [Homomorphism](#homomorphism)
3. [Interchange](#interchange)

## Laws 
__<a id="reflexivity">Reflexivity</a>__

`a.f(a) === true`

__<a id="symmetry">Symmetry/commutativity</a>__

`a.f(b) === b.f(a)`

__<a id="transitivity">Transitivity</a>__

`a.f(b) && b.f(c) => a.f(c)`

__<a id="totality">Totality</a>__

`a.f(b) || b.f(a) === true`

__<a id="antisymmetry">Antisymmetry</a>__

`a.f(b) && b.f(a) => a == b`

__<a id="associativity">Associativity</a>__

`a.f(b).f(c) === a.f(b.f(c))`

__<a id="identity">Identity</a>__

`u.f(x => x) === u`

__<a id="composition">Composition</a>__

`u.f(f').f(g') === u.f(x => g'(f'(x)))`

__<a id="homomorphism">Homomorphism</a>__ 

`A.f(x).g(A.f(u)) === A.f(u(x))`

__<a id="interchange">Interchange</a>__

`A.f(y).g(u) === u.g(A.f(f' => f'(y)))`