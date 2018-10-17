const assert = require('assert');

const input = '("add" 2 (subtract 422 2))';

function transform(tokens) {

    let index = 0;

    let ast={
        type:"Program",
        body:[]
    }

    function walk(){
        token = tokens[index];
        if(token.type == "number"){
            index++;
            return {
                type:"NumberLiteral",
                value:token.value
            }
        }
        if(token.type == "paren" && token.value == "("){
            token = tokens[++index];
            let expression= {
                type:"CallExpression",
                name:token.value,
                params:[]
            }
            index++;

            while(!(token.type =="paren" && token.value ==")")){
                 expression.params.push(walk())
                 token = tokens[index];
            }



            return expression;
        }

        if(token.type == "paren" && token.value == ")") return;

    }

     ast.body.push(walk())

     return ast;


}

const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
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
                            value: '422',
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

console.log(re);

assert.deepStrictEqual(re, ast, 'tokens转换为 ast错误');
