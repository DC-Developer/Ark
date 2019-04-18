const node_types = require('./nodes/node_types')

module.exports = (tokens) => {
    console.log('tokens in AST: ', tokens)
    let i = 0
    let ln = tokens.length

    const ast = node_types.program();

    // while (i != ln) {

    // }
}