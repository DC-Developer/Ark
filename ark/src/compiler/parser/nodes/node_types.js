function program(file) {
    const start = file[0].range[0];
    const end = file[file.length - 1].range[1]
    return {
        type: 'Program',
        start: start,
        end: end,
        body: [],
        sourceType: 'module'
    }
}

function element(token, node) {
    return {
        type: 'JSXElement',
        start: token.range[0],
        end: null,
        openingElement: node,
        closingElement: {},
        children: []
    }
}

function openingElement(token, node) {
    return {
        type: 'JSXOpeningElement',
        start: token.range[0],
        end: token.range[1],
        attributes: [],
        name: node,
        selfClosing: false
    }
}

function closingElement(token, node) {    
    return {
        type: 'JSXClosingElement',
        start: token.range[0],
        end: token.range[1],
        name: node
    }
}

function identifier(token) {
    return {
        type: 'Identifier',
        start: token.range[0],
        end: token.range[1],
        name: token.value
    }
}

function jsxIdentifier(token) {
    const identifier = token.value.replace('<').replace
    return {
        type: 'JSXIdentifier',
        start: token.range[0] + 1,
        end: token.range[1] - 1,
        name: token.value.replace(/\W+/g, '')
    }
}

function variableDeclaration(token) {
    return {
        type: 'VariableDeclaration',
        start: token.range[0],
        end: null,
        declarations: [],
        kind: token.value
    }
}

function variableDeclarator(token, id) {
    return {
        type: 'VariableDeclarator',
        start: token.range[0],
        end: null,
        id: id,
        init: {}
    }
}

function functionDeclaration() {
    return {
        type: 'FunctionDeclaration',
        start: null,
        end: null,
        id: {},
        expression: null,
        generator: null,
        params: [],
        body: {}
    }
}

function returnStatement(token) {
    return {
        type: 'ReturnStatement',
        start: token.range[0],
        end: token.range[1],
        argument: {}
    }
}

function blockStatement() {
    return {
        type: 'BlockStatement',
        start: null,
        end: null,
        argument: {}
    }
}

function text(node) {
    return {
        type: 'JSXText',
        start: node.range[0],
        end: node.range[1],
        value: node.value
    }
}

module.exports = {
    program,
    element,
    text,
    openingElement,
    closingElement,
    identifier,
    jsxIdentifier,
    variableDeclaration,
    variableDeclarator,
    functionDeclaration,
    returnStatement,
    blockStatement
}