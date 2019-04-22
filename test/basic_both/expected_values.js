module.exports = {
    type: 'Program',
    start: 0,
    end: 201,
    body: [
        { 
            type: 'VariableDeclaration',
            start: 0,
            end: 106,
            declarations: [
                { 
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 106,
                    id: { type: 'Identifier', start: 6, end: 14, name: 'component' },
                    init: { 
                        type: 'JSXElement',
                        start: 18,
                        end: 106,
                        openingElement: {
                            type: 'JSXOpeningElement',
                            start: 18,
                            end: 22,
                            attributes: [],
                            name: { type: 'JSXIdentifier', start: 19, end: 21, name: 'div' },
                            selfClosing: false
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            start: 101,
                            end: 106,
                            name: { type: 'JSXIdentifier', start: 102, end: 105, name: 'div' }
                        },
                        children: [
                            { type: 'JSXText', start: 25, end: 39, value: 'hello    ' },
                            { 
                                type: 'JSXElement',
                                start: 40,
                                end: 61,
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    start: 40,
                                    end: 43,
                                    attributes: [],
                                    name: { type: 'JSXIdentifier', start: 41, end: 42, name: 'h1' },
                                    selfClosing: false
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    start: 57,
                                    end: 61,
                                    name: { type: 'JSXIdentifier', start: 58, end: 60, name: 'h1' }
                                },
                                children: [
                                    { type: 'JSXText', start: 44, end: 56, value: 'Hello, World!' }
                                ] 
                            },
                            { 
                                type: 'JSXElement',
                                start: 68,
                                end: 87,
                                openingElement: { 
                                    type: 'JSXOpeningElement',
                                    start: 68,
                                    end: 70,
                                    attributes: [],
                                    name: { type: 'JSXIdentifier', start: 69, end: 69, name: 'p' },
                                    selfClosing: false 
                                },
                                closingElement: { 
                                    type: 'JSXClosingElement',
                                    start: 84,
                                    end: 87,
                                    name: { type: 'JSXIdentifier', start: 85, end: 86, name: 'p' } },
                                    children: [
                                        { 
                                            type: 'JSXText', 
                                            start: 71, 
                                            end: 83, 
                                            value: 'hello, world!' 
                                        } 
                                    ] 
                                },
                                { type: 'JSXText', start: 90, end: 98, value: 'world' }
                        ] }
                    }
            ],
            kind: 'const' 
        },
        { 
            type: 'ReturnStatement',
            start: 138,
            end: 201,
            argument: { 
                type: 'JSXElement',
                start: 156,
                end: 201,
                openingElement: {
                    type: 'JSXOpeningElement',
                    start: 156,
                    end: 159,
                    attributes: [],
                    name: { type: 'JSXIdentifier', start: 157, end: 158, name: 'h1' },
                    selfClosing: false 
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    start: 197,
                    end: 201,
                    name: { type: 'JSXIdentifier', start: 198, end: 200, name: 'h1' }
                },
                children: [
                    {
                        type: 'JSXText',
                        start: 162,
                        end: 196,
                        value: 'Hello, World!        '
                    }
                ]
            }
        }
    ],
    sourceType: 'module'
}