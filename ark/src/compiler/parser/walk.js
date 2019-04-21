const node_types = require('./nodes/node_types')
const declaration_types = require('./declaration_types')

function walk(p_node) {
    let parsed_ctag = false
    let node

    while (!parsed_ctag) {
        node = this.tokens[this.pos]

        if (node.type == 'Identifier') {
            const identifier = node_types.identifier(node)
            const v_declarator = node_types.variableDeclarator(node, identifier)

            ++this.pos
            walk.call(this, v_declarator)

            p_node.end = v_declarator.end
            p_node.declarations.push(v_declarator)

            parsed_ctag = true
            break
        }

        if (node.type == 'JSXOpeningElement') {
            const identifier = node_types.jsxIdentifier(node)
            const opening_element = node_types.openingElement(node, identifier)
            const jsxElement = node_types.element(node, opening_element)

            ++this.pos
            walk.call(this, jsxElement)

            if (p_node.type == 'VariableDeclarator')
                p_node.init = jsxElement

            if (p_node.type == 'ReturnStatement') {
                p_node.end = jsxElement.end
                p_node.argument = jsxElement

                parsed_ctag = true
            }

            if (p_node.type == 'JSXElement')
                p_node.children.push(jsxElement)
        }

        if (node.type == 'JSXText' && p_node.type == 'JSXElement')
            p_node.children.push(node_types.text(node))

        if (node.type == 'JSXClosingElement') {
            const identifier = node_types.jsxIdentifier(node)
            const closing_element = node_types.closingElement(node, identifier)

            if (p_node.type == 'JSXElement') {
                p_node.closingElement = closing_element
                p_node.end = closing_element.end
            }

            if (p_node.type == 'VariableDeclarator') {
                p_node.end = closing_element.end
                p_node.init.end = closing_element.end
                p_node.init.closingElement = closing_element
            }

            parsed_ctag = true
        }

        this.pos++
    }
}

module.exports = walk