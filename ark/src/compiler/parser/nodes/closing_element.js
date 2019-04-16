function closingElement(token) {
    return {
        type: 'JSXClosingElement',
        start: token.range[0],
        end: token.range[1],
        name: {}
    }
}
return closingElement