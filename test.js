const fs = require('fs')
const program = './jsx.js'
const Lexer = require('./ark/src/compiler/lexer/lexer')

fs.readFile(program, 'utf8', function(err, file) {
  if (err) throw err
  const tokenize = new Lexer(file.toString())
  console.log(tokenize.lex())
})
