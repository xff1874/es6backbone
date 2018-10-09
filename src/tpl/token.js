const assert = require('assert');

const input = '("add" 2 (subtract 422 2))';

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

function tokenizer(input) {
    let index = 0;
    let tokens = [];
    while (index < input.length) {
        let c = input[index];

        if (c == '(') {
            tokens.push({
                type: 'paren',
                value: c,
            });
            index++;
            continue;
        }

        if (c == ')') {
            tokens.push({
                type: 'paren',
                value: c,
            });
            index++;
            continue;
        }

        let word = /[a-zA-Z]/;
        if (word.test(c)) {
            let sequence = '';
            while (word.test(c)) {
                sequence += c;
                c = input[++index];
            }

            tokens.push({
                type: 'name',
                value: sequence,
            });
            continue;
        }

        let number = /\d/;
        if (number.test(c)) {
            let alpha = '';
            while (number.test(c)) {
                alpha += c;
                c = input[++index];
            }

            tokens.push({
                type: 'number',
                value: alpha,
            });
            continue;
        }

        //双引号处理
        if (c === '"') {
            c = input[++index];
            let s = '';
            while (c !== '"') {
                s += c;
                c = input[++index];
            }
            tokens.push({
                type: 'string',
                value: s,
            });
            //skip last dobule quote
            ++index
            continue;
        }

        let space = /\s/;
        if (space.test(c)) {
            //donothing
            index++;
            continue;
        }

        throw new Error(` no charactor ${c} `);
    }
    return tokens;
}
const re = tokenizer(input);
assert.deepEqual(re, tokens, 'token解析错误');
console.log(re);
