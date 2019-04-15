const file = 'hello_world.js'
const lex = require('./lex')
const test1 = require('./test_nested_values')

test('tokenizes nested hello world values', () => {
    lex(file, (tokens) => {
        expect(tokens).toBe(test1)
    })
})