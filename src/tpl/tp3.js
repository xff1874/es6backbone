var str =
'My skills:' +
'<%for(var index in this.skills) {%>' +
'<a href=""><%this.skills[index]%></a>' +
'<%}%>';

// var r = [];
// r.push('My skills:');
// for(var index in this.skills) {
// r.push('<a href="">');
// r.push(this.skills[index]);
// r.push('</a>');
// }
// return r.join('');

// const body =  'console.log("my name is "+ this.name+"age is"+ this.age+"work at"+ this.info.company)';
// template(str,{
//     name: "zwd",
//     age: 29,
//     info:{
//         company:"netease"
//     }
// })
const re = /<%(.+?)%>/g;
let array,newStr='',cursor=0,r=[];
while(( array=re.exec(str))!=null){
    r.push(str.slice(cursor,array.index));
    newStr+= array[1];
    cursor = array.index+array[0].length;
}
const template = new Function(newStr)
const finalRe= template.apply({
    name: "zwd",
    age: 29,
    info:{
        company:"netease"
    }
})

console.log(finalRe)