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

function traverse(ast, visitor) {
    function traverseArray(array, parent) {
        array.forEach(item => {
            traverseNode(item, parent);
        });
    }

    function traverseNode(node, parent) {
        const method = visitor[node.type];

        if (method && method.enter) {
            method.enter(node, parent);
        }

        switch (node.type) {
            case 'Program':
                traverseArray(node.body, node);
                break;

            case 'CallExpression':
                traverseArray(node.params, node);
                break;

            case 'NumberLiteral':
            case 'StringLiteral':
                break;
                default:
                throw new TypeError(node.type)
        }

        if (method && method.exit) {
            method.exit(node, parent);
        }
    }

    traverseNode(ast, null);
}

function transform(ast) {
    let newAst = {
        type: 'Program',
        body: [],
    };
    //why
    ast._context = newAst.body;

    traverse(ast, {
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },
        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                };

                node._context = expression.arguments;

                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression,
                    };
                }

                parent._context.push(expression);
            },
        },
    });

    return newAst;
}

const re = transform(ast);

console.log(re);

assert.deepStrictEqual(re, newAst, '变形出错');
