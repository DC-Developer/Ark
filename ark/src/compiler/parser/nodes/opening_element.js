function openingElement(token) {
    return {
        type: 'JSXOpeningElement',
        start: token.range[0],
        end: token.range[1],
        attributes: [],
        name: {},
        selfClosing: null
    }
}
return openingElement