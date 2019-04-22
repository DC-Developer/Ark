const node_types = require('./nodes/node_types')
const declaration_types = require('./declaration_types')
const walk = require('./walk')


module.exports = (tokens) => {
    let i = 0
    let ln = tokens.length

    let node
    const ast = node_types.program(tokens);
    const state = {
        tokens: tokens,
        pos: i,
        length: ln
    }
    
    //hacked together, will refactor later
    while (state.pos < state.length) {
       node = tokens[state.pos]

       if (state.pos == 0) {
           ast.start = node.range[0]

           if (declaration_types.variable.includes(node.value)) {
               const v_declaration = node_types.variableDeclaration(node)
               ++state.pos

               walk.call(state, v_declaration)
               ast.body.push(v_declaration)
           }
           //for now return statement will be a declaration type
           if (node.value == declaration_types.return) {
               const r_declaration = node_types.returnStatement(node)
               ++state.pos

               walk.call(state, r_declaration)
               ast.body.push(r_declaration)
           }
       }

       //just in case previous conditional ran
       node = tokens[state.pos]

       //for now return statement will be a declaration type
       if (node && node.value == declaration_types.return) {
           const r_declaration = node_types.returnStatement(node)
           ++state.pos

           walk.call(state, r_declaration)
           ast.body.push(r_declaration)
       }

       state.pos++
    }
    return ast
}