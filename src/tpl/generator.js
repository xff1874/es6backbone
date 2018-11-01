const assert = require('assert');
function generator(node) {
    switch (node.type) {
        case 'CallExpression':
            return (
                generator(node.callee) +
                '(' +
                node.arguments.map(generator)
                    .join(', ') +
                ')'
            );
            return;
        case 'ExpressionStatement':
            return generator(node.expression) + ';';
            break;
        case 'Program':
            return node.body.map(generator).join('\n');
            break;
        case 'NumberLiteral':
            return node.value;
            break;
        case 'Identifier':
            return node.name;
            break;
        case 'StringLiteral':
            return '"' + node.value + '"';
            break;
    }
}

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

const output = 'add(2, subtract(4, 2));';

const re = generator(newAst);

assert.deepEqual(re, output, 'code generator is wrong');
