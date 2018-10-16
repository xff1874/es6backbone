const assert = require('assert');

const input = '("add" 2 (subtract 422 2))';

function transform(tokens) {
    let index=0;
    let ast = {
        type: 'Program',
        body: [],
    };

    function walk() {
        let token = tokens[index];
        if (token.type == 'paren' && token.value == ')') return;

        if (token.type == 'paren' && token.value == '(') {
            index++;
            walk()
        }

        if (token.type == 'name' || token.type == 'string') {
            let expression = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };
            index++;

            expression.params.push(walk())
            return expression;
        }

        if(token.type == "number"){
            index++;
            return {
                type:"NumberLiteral",
                value:token.value
            }
        }
    }

    ast.body.push(walk())
}

const tokens = [
    { type: 'paren', value: '(' },
    { type: 'string', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '422' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
];

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

const re = transform(tokens);

assert.deepEqual(re, ast, 'tokens转换为 ast错误');
