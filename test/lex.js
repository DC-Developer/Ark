const fs = require('fs')
const path = require("path");
const Lexer = require('../ark/src/compiler/lexer/lexer')

function parseJsx(file_path, cb) {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, file_path))
        const tokenize = new Lexer(file.toString())
        const tokens = tokenize.lex()
        cb(tokens)
    } catch (e) {
        console.log(e)
    }
}

module.exports = parseJsx