function element() {
    return {
        type: 'JSXElement',
        start: null,
        end: null,
        openingElement: {},
        closingElement: {},
        children: []
    }
}

module.exports = element