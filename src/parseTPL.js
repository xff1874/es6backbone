export default function parseTpl(str) {
    let re = /<%([^%]+)%>/g;

    let array;
    let cursor = 0;
    let stocks = [];
    let finalStr = ''

    function escapeStr(str) {
        // return str.replace(/\\|'|\r|\n|\u2028|\u2029/g, match => {
        //     return '\\'+{
        //         "'": "'",
        //         '\\': '\\',
        //         '\r': 'r',
        //         '\n': 'n',
        //         '\u2028': 'u2028',
        //         '\u2029': 'u2029',
        //     }[match];
        // });
        return str;
    }

    function addTrival(str) {
        finalStr+="`"+`${escapeStr(str)}`+'`';
    }

    function addMatch(match) {
        finalStr+="+ (" +`${escapeStr(match)}`+") +";
    }

    while ((array = re.exec(str)) !== null) {
        addTrival(str.slice(cursor, array.index));
        addMatch(array[1]);
        cursor = array.index + array[0].length;
    }

    let final = str.slice(cursor, str.length);

    addTrival(final);

    return new Function("model",'return '+finalStr);

}

//todo:1.如果按照underscope的template方法，字符串链接太复杂。如果按照example.js的例子。模板必须每行一个字符串。