import tokenizer from './tokenize'

class Lexer {
  constructor(file) {
    this.file = file
  }
  lex() {
        this.file = this.file.split('')
        this.file = tokenizer(this.file)
        return this.file
  }
}
export default Lexer