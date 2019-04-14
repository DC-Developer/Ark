const KEYWORDS = require('../grammar/keywords')
const ELEMENTS = require('../grammar/elements')
const WHITESPACE = /\s/
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

        state.tokens.push({
          type: 'Keyword',
          value: buff_string_type,
          range: [range_start, range_end]
        })

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

        state.tokens.push({
          type: 'Identifier',
          value: buff_string_type,
          range: [range_start, range_end]
        })

        state.lexemes = []
        buff_string_type = ''

        //now check for EQUALS
        buff = file[++state.pos]
        while (!EQUALS.test(buff) && state.pos != state.length) {
            buff = file[++state.pos]
        }

        if (EQUALS.test(buff)) {
            state.tokens.push({
              type: 'Punctuator',
              value: buff,
              range: [state.pos]
            })
        } else {
            //Will add more robust error handling
            throw new SyntaxError('Missing "=" in variable declaration')
        }
    
        //assumed the equals was handled
        buff = file[++state.pos]
        walk.call(state, file)
    }

    //Return statement parsing will be added later
    // if (is_keyword && is_return) {

    // }

    state.pos++
  }
  console.log('Lexing Complete')
  console.log('Tokens: ', state.tokens)
}