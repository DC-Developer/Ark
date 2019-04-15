const fs = require('fs')
const Lexer = require('../../ark/src/compiler/lexer/lexer')

function parseJsx(file_path, cb) {
    try {
        const file = fs.readFileSync(file_path)
        const tokenize = new Lexer(file.toString())
        const tokens = tokenize.lex()
        cb(tokens)
    } catch (e) {
        console.log(e)
    }
}

module.exports = parseJsx