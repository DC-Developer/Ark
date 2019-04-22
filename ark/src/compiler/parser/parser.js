const toAst = require('./ast')

class Parser {
    constructor(tokens) {
        this.tokens = tokens
    }
    parse() {
        return toAst(this.tokens)
    }
}

module.exports = Parser