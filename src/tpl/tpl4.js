var template =
    'My skills:' +
    '<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' +
    'console.log(<%this.skills[index]%>)' +
    '<%}%>' +
    '<%} else {%>' +
    '<p>none</p>' +
    '<%}%>';
TemplateEngine(template, {
        showSkills: ['badminton', 'videogames'],
    })

function TemplateEngine(tpl, obj) {
    let re = /<%(.+?)%>/g;
    let exclude = /(if|for|else|{|})/g;

    let array;
    let cursor = 0;
    let ntpl = [];
    let newStr = 'var ntpl=[];';

    function add(fragment) {
        if (!fragment) return;
        if (exclude.test(fragment)) {
            newStr += fragment;
        } else {
            fragment= fragment.replace(/"/g,'\\"')
            newStr += `ntpl.push('${fragment}');`;
        }

        // console.log(fragment);
    }

    while ((array = re.exec(tpl))) {
        let trival = tpl.slice(cursor, array.index);
        add(trival);
        add(array[1]);
        cursor = array.index + array[0].length;
    }


    // return newStr;

    return new Function(newStr).apply(obj)
}
