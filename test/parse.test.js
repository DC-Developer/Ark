const lex = require('./lex')
const parse = require('./parse')

//Files to be tested
const nested_file = './nested_nodes/nested_nodes.js'
const test1 = require('./nested_nodes/expected_values')

const return_formats = './jsx_functions/jsx_functions.js'
const test2 = require('./jsx_functions/expected_values')

const variable_function_jsx = require('./basic_both/basic_both')
const test3 = require('./basic_both/expected_values')

test('tokenizes nested child nodes', () => {
    lex(nested_file, (tokens) => {
        expect(tokens).toEqual(test1)
    })
})

test('tokenizes jsx from multiple function return formats', () => {
    lex(return_formats, (tokens) => {
        expect(tokens).toEqual(test2)
    })
})

test('parses basic variable and function jsx values', () => {
    parse(variable_function_jsx, (ast) => {
        expect(ast).toEqual(test3)
    })
})
