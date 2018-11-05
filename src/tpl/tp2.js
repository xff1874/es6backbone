const str="Hello, my name is <%this.name%> and <%this.age%> years old. My compnay is <%this.info.company%>"

const body =  'console.log("my name is "+ this.name+"age is"+ this.age+"work at"+ this.info.company)';
// template(str,{
//     name: "zwd",
//     age: 29,
//     info:{
//         company:"netease"
//     }
// })
const re = /<%(.+?)%>/g;
let array,newStr='',cursor=0;
while(( array=re.exec(str))!=null){
    newStr += str.slice(cursor,array.index);
    newStr+= array[1];
    cursor = array.index+array[0].length;
}

const template = new Function(''+newStr)
template.apply({
    name: "zwd",
    age: 29,
    info:{
        company:"netease"
    }
})