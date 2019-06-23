const compose = (f, g) => x => f(g(x));

const _logWith = withStringify => preProcess => f => {
    console.log('--------------------')
    console.log('\n')
    console.log(`${f} =`, withStringify
        ? JSON.stringify(preProcess(f))
        : preProcess(f)
    )
    console.log('\n')
}

export const logWith = _logWith(false)
export const logWithStringify = _logWith(true)
export const log = logWith(v => v)