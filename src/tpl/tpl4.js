var template =
    'My skills:' +
    '<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' +
    '<%this.skills[index]%>' +
    '<%}%>' +
    '<%} else {%>' +
    '<p>none</p>' +
    '<%}%>';
let r = TemplateEngine(template, {
    skills: ['badminton', 'videogames'],
    showSkills: true,
});
console.log(r);

function TemplateEngine(tpl, obj) {
    let re = /<%(.+?)%>/g;
    let exclude = /(if|for|else|{|})/g;

    let array;
    let cursor = 0;
    let ntpl = [];
    let newStr = 'var ntpl=[];';

    function add(fragment, isJS) {
        // fragment = fragment && fragment.replace(/\s/g, '');
        if (!fragment) return;

        if (exclude.test(fragment)) {
            newStr += fragment;
        } else {
            fragment = fragment.replace(/"/g, '\\"');
            newStr += isJS //this关键字处理。
                ? `ntpl.push(${fragment});`
                : `ntpl.push('${fragment}');`;
        }

        // console.log(fragment);
    }

    while ((array = re.exec(tpl))) {
        let trival = tpl.slice(cursor, array.index);
        add(trival);
        add(array[1], true);
        cursor = array.index + array[0].length;
    }

    newStr += ";return ntpl.join(' ')";

    // return newStr;

    let f1 = new Function(newStr);
    return f1.apply(obj);
}

//Todo: 空格处理。
