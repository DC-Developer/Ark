const lex = require('./lex')

//Files to be tested
const nested_file = './nested_nodes/nested_nodes.js'
const test1 = require('./nested_nodes/expected_values')

const return_formats = './jsx_functions/jsx_functions.js'
const test2 = require('./jsx_functions/expected_values')

test('tokenizes nested child nodes', () => {
    lex(nested_file, (tokens) => {
        expect(tokens).toBe(test1)
    })
})

test('tokenizes jsx from multiple function return formats', () => {
    lex(return_formats, (tokens) => {
        expect(tokens).toBe(test2)
    })
})