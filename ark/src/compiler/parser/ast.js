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

    while (state.pos != state.length) {
       node = tokens[state.pos]

       if (i == 0) {
           ast.start = node.range[0]

           if (declaration_types.variable.includes(node.value)) {
               const v_declaration = node_types.variableDeclaration(node)
               ++state.pos

               walk.call(state, v_declaration)
               ast.body.push(v_declaration)

               console.log('AST: ', ast)
               console.log('BODY: ', ast.body[0])
               console.log('DECLARATIONS: ', ast.body[0].declarations[0])
           }
           //for now return statement will be a declaration type
        //    if (declaration_types.return == node.value) {
        //        ast.body.push(node_types.returnStatement(node))

        //    }
       }

       state.pos++
    }
    // console.log(ast)
}