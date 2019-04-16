function identifier(token) {
    return {
        type: 'JSXIdentifier',
        start: token.range[0],
        end: token.range[1],
        name: ''
    }
}

module.exports = identifier