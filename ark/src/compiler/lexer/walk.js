const KEYWORDS = require('../grammar/keywords')
const ELEMENTS = require('../grammar/elements')
const WHITE_SPACE = /\s/
const NON_WHITE_SPACE = /\S/
const NEW_LINE = /\r\n?|\n/
const L_CHARS = /[a-z]/
const CHAR = /\w/

const getText = require('./get_text')

function walk(html) {
  if (this.pos == this.length) return

  let buff = html[this.pos]
  let buff_string = ''
  let closing_tag = ''
  let parsed_ctag = false
  let etag_parse_started = false
  let s_pos, e_pos

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
      let ctag_check = ''
      let pos = this.pos
      let $s_pos = pos
      let ahead = pos + 1

      etag_parse_started = true

      if (html[ahead] != '/') {

        if (this.lexemes.length)
            getText.call(this)

        walk.call(this, html)
        etag_parse_started = false

      } else {

          if (this.lexemes.length)
              getText.call(this)

          while (buff != '>' && pos != this.length) {
              ctag_check += buff
              buff = html[++this.pos]
          }

          if (buff == '>')
              ctag_check += buff
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