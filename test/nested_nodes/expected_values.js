module.exports = [
    { type: 'Keyword', value: 'const', range: [ 0, 4 ] },
    { type: 'Identifier', value: 'component', range: [ 6, 14 ] },
    { type: 'Punctuator', value: '=', range: [ 16 ] },
    { type: 'JSXOpeningElement', value: '<div>', range: [ 18, 22 ] },
    { type: 'JSXText', value: 'hello    ', range: [ 25, 39 ] },
    { type: 'JSXOpeningElement', value: '<h1>', range: [ 40, 43 ] },
    { type: 'JSXText', value: 'Hello, World!', range: [ 44, 56 ] },
    { type: 'JSXClosingElement', value: '</h1>', range: [ 57, 61 ] },
    { type: 'JSXOpeningElement', value: '<p>', range: [ 68, 70 ] },
    { type: 'JSXText', value: 'hello, world!', range: [ 71, 83 ] },
    { type: 'JSXClosingElement', value: '</p>', range: [ 84, 87 ] },
    { type: 'JSXText', value: 'world', range: [ 90, 98 ] },
    { type: 'JSXClosingElement',
    value: '</div>',
    range: [ 101, 106 ] }
]