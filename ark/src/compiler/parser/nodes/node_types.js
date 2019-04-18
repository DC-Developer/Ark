function program(token) {
    return {
        type: 'Program',
        start: null,
        end: null,
        body: [],
        sourceType: 'module'
    }
}

function element(token, node) {
    return {
        type: 'JSXElement',
        start: token.range[0],
        end: null,
        openingElement: node(token),
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
        name: node(token),
        selfClosing: false
    }
}

function closingElement(token, node) {    
    return {
        type: 'JSXClosingElement',
        start: token.range[0],
        end: token.range[1],
        name: node(token)
    }
}

function identifier(token) {
    const identifier = token.name.replace('<').replace
    return {
        type: 'JSXIdentifier',
        start: token.range[0] + 1,
        end: token.range[1] - 1,
        name: token.value.replace(/\W+/g, '')
    }
}

function variableDeclaration() {
    return {
        type: 'VariableDeclaration',
        start: null,
        end: null,
        declarations: [],
        kind: token.value
    }
}

function variableDeclarator() {
    return {
        type: 'VariableDeclarator',
        start: null,
        end: null,
        id: {},
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

function returnStatement() {
    return {
        type: 'ReturnStatement',
        start: null,
        end: null,
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

module.exports = {
    program,
    element,
    openingElement,
    closingElement,
    identifier
}