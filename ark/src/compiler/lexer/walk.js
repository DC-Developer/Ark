const KEYWORDS = require('../../grammar/keywords')
const ELEMENTS = require('../../grammar/elements')
const WHITE_SPACE = /\s/
const L_CHARS = /[a-z]/
const CHAR = /\w/
const NON_WHITE_SPACE = /\S/
const NEW_LINE = /\r\n?|\n/

let buff = ''

function walk(html) {
  if (this.pos == this.length) return

  let buff_string = ''
  let closing_tag = ''
  let parsed_ctag =  false
  let etag_parse_started = false
  let s_pos, e_pos

  if (this.pos == 0)
    buff = html[this.pos]

  while (buff != '<' && this.pos != this.length)
    buff = html[++this.pos]

  if (buff == '<') {
    this.lexemes.push({
      type: 'Character',
      value: buff,
      pos: this.pos
    })

    buff_string += buff
    while (!ELEMENTS.includes(buff_string) && this.pos != this.length) {
        buff = html[++this.pos]
        buff_string += buff
    }

    if (!ELEMENTS.includes(buff_string))
        throw new SyntaxError('Invalid JSX')

    s_pos = this.lexemes[0].pos
    e_pos = this.pos

    this.tokens.push({
      type: 'JSXOpeningElement',
      value: buff_string,
      range: [s_pos, e_pos]
    })

    closing_tag = buff_string.replace('<', '</')
    this.lexemes = []
  } else {
    throw new SyntaxError('No "<" found!')
  }

  while (!parsed_ctag && this.pos != this.length) { 
    buff = html[++this.pos]

    if (buff == '<') {
      // return console.log(buff, this.lexemes)
      let ctag_check = ''
      let buff_cpy = buff
      let pos = this.pos
      let $s_pos = pos
      let ahead = pos + 1

      etag_parse_started = true

      if (html[ahead] != '/') {
          walk.call(this, html)
          etag_parse_started = false
      } else {
          if (this.lexemes.length) {
            const start = this.lexemes[0].pos
            const end = this.lexemes[this.lexemes.length - 1].pos
            let char_str = ''
            let ln = this.lexemes.length
            let count = 0

            while (count != ln) {
                char_str += this.lexemes[count].value
                count++
            }

            this.tokens.push({
              type: 'JSXText',
              value: char_str,
              range: [start, end]
            })
            this.lexemes = []
          }

          while (buff_cpy != '>' && pos != this.length) {
              ctag_check += buff_cpy
              buff_cpy = html[++this.pos]
          }

          if (buff_cpy == '>')
              ctag_check += buff_cpy
          else
              throw new SyntaxError('Missing ">" in closing tag')
              
          if (ctag_check == closing_tag) {
              parsed_ctag = true
              this.tokens.push({
                type: 'JSXClosingElement',
                value: closing_tag,
                range: [$s_pos, this.pos]
              })
          } else {
              console.log('closing tag check: ', ctag_check, this.pos)
              console.log(this)
              throw new SyntaxError('Missing closing tag')
          }
      }
    }

    if (
      !etag_parse_started && 
      buff != '<' &&
      !NEW_LINE.test(buff)
    ) {
      this.lexemes.push({
        type: 'Character',
        value: buff,
        pos: this.pos
      })
    }
  }
}
module.exports = walk