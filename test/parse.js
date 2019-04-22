const Parser = require('../ark/src/compiler/parser/parser')

function parse(tokens, cb) {
    const parser = new Parser(tokens)
    return cb(parser.parse())
}

module.exports = parse