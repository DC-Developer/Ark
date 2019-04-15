const WHITE_SPACE = /\s/
const NEW_LINE = /\r\n?|\n/

function getText() {
    const start = this.lexemes[0].pos
    const end = this.lexemes[this.lexemes.length - 1].pos
    const ln = this.lexemes.length
    let char_str = ''
    let count = 0
    let buff = this.lexemes[count].value

    for (; count < ln; count++) {
        buff = this.lexemes[count].value
        char_str += buff
    }

    char_str = char_str.replace(/^\s+/g, '')
    
    if (char_str == '') 
        return this.lexemes = []

    this.tokens.push({
        type: 'JSXText',
        value: char_str,
        range: [start, end]
    })
    this.lexemes = []
}

module.exports = getText