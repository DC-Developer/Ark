function element(token) {
    return {
        type: 'JSXElement',
        start: token.range[0],
        end: token.range[1],
        openingElement: {},
        closingElement: {},
        children: []
    }
}

module.exports = element