const KEYWORDS = require('../grammar/keywords')
const ELEMENTS = require('../grammar/elements')
const WHITESPACE = /\s/
const NEW_LINE = /\r\n?|\n/
const EQUALS = /=/
const L_CHARS = /[a-z]/

const walk = require('./walk')

function isElement(tag) {
    return ELEMENTS.includes(tag)
}

module.exports = (file) => {
  let buff = ''
  let buff_string_type = ''
  let html = ''

  let is_keyword = false
  let is_return = false

  //For token position ranges
  let range_start
  let range_end

  const state = {
    tokens: [],
    lexemes: [],
    length: file.length,
    pos: 0
  }

  let closing_tag_reached = false
  let closing_tag_buff

  let s_parse = false
  let e_parse = false

  while (state.pos != state.length) {
    let temp = []
    buff = file[state.pos]

    while (L_CHARS.test(buff)) {
        state.lexemes.push({
          type: 'Character',
          value: buff,
          pos: state.pos
        })
        buff_string_type += buff
        buff = file[++state.pos]
    }

    if (KEYWORDS.includes(buff_string_type)) {
        range_start = state.lexemes[0].pos
        range_end = state.lexemes[state.lexemes.length - 1].pos
        is_keyword = true

        temp.push({
          type: 'Keyword',
          value: buff_string_type,
          range: [range_start, range_end]
        })

        if (buff_string_type == 'return')
            is_return = true
        else
            is_return = false

        state.lexemes = []
        buff_string_type = ''
    } else {
        is_keyword = false
        buff_string_type = ''
        state.lexemes = []
    }

    if (is_keyword && !is_return) {
        buff = file[++state.pos]   
        while (L_CHARS.test(buff)) {
            state.lexemes.push({
              type: 'Character',
              value: buff,
              pos: state.pos
            })
            buff_string_type += buff
            buff = file[++state.pos]
        }
        
        range_start = state.lexemes[0].pos
        range_end = state.lexemes[state.lexemes.length - 1].pos

        temp.push({
          type: 'Identifier',
          value: buff_string_type,
          range: [range_start, range_end]
        })

        state.lexemes = []
        buff_string_type = ''

        while (!EQUALS.test(buff) && state.pos != state.length) {
            buff = file[++state.pos]
        }

        if (EQUALS.test(buff)) {
            temp.push({
              type: 'Punctuator',
              value: buff,
              range: [state.pos]
            })
        } else {
            throw new SyntaxError('Missing "=" in variable declaration')
        }
    
        buff = file[++state.pos]
        while (WHITESPACE.test(buff))
            buff = file[++state.pos]
        if (buff == '<') {
            state.tokens = state.tokens.concat(temp)
            walk.call(state, file)
        }

        //don't do anything if not jsx
        is_keyword = false
    }

    if (is_keyword && is_return) {
        buff = file[++state.pos]
        
        if (NEW_LINE.test(buff))
            throw new SyntaxError('Invalid return expression')
        
        while (buff == ' ')
            buff = file[++state.pos]
        
        if (buff == '(') {
            buff = file[++state.pos]
            while (WHITESPACE.test(buff))
                buff = file[++state.pos]
        }

        if (buff == '<') {
            state.tokens = state.tokens.concat(temp)
            walk.call(state, file)
        } 
    }

    state.pos++
  }
  return state.tokens
}