const assert = require('assert');

const ast = {
    type: 'Program',
    body: [
        {
            type: 'CallExpression',
            name: 'add',
            params: [
                {
                    type: 'NumberLiteral',
                    value: '2',
                },
                {
                    type: 'CallExpression',
                    name: 'subtract',
                    params: [
                        {
                            type: 'NumberLiteral',
                            value: '4',
                        },
                        {
                            type: 'NumberLiteral',
                            value: '2',
                        },
                    ],
                },
            ],
        },
    ],
};

const newAst = {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add',
                },
                arguments: [
                    {
                        type: 'NumberLiteral',
                        value: '2',
                    },
                    {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'subtract',
                        },
                        arguments: [
                            {
                                type: 'NumberLiteral',
                                value: '4',
                            },
                            {
                                type: 'NumberLiteral',
                                value: '2',
                            },
                        ],
                    },
                ],
            },
        },
    ],
};

function transform(ast) {
    let newAst = {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {},
            },
        ],
    };

    function walk(node) {
        node.params.forEach(item=>{
            if(item.type== "CallExpression"){
                walk(item)
            }
        })
        let newNode = {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: node.name,
            },
            arguments: [...node.params]  ,
        };
        return newNode;
    }

    ast.body.forEach(item => {
        newAst.body[0].expression = walk(item);
    });
    return newAst;
}

const re = transform(ast);

console.log(re)

assert.deepStrictEqual(re, newAst, '变形出错');
