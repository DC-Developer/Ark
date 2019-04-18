const toAst = require('./ast')

class Parser {
    constructor(tokens) {
        this.tokens = tokens
    }
    parse() {
        return toAst(this.tokens)
    }

    log() {
        console.log(this.tokens)
    }
}

module.exports = Parser