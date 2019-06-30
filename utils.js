export const alphabet = Array(25).fill(0).reduce(
    (acc, x, indx) => acc.concat([String.fromCharCode(acc.charCodeAt(indx) + 1)]),
    'a'
)

const compose = (f, g) => x => f(g(x))

export const delimiter = () => console.log('--------------------\n')

const _logWith = withStringify => preProcess => f => {
    delimiter()
    console.log(`${f} =`, withStringify
        ? JSON.stringify(preProcess(f))
        : preProcess(f)
    )
    console.log('\n')
}

export const logWith = _logWith(false)
export const logWithStringify = _logWith(true)
export const log = logWith(v => v)