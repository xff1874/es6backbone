const str="<p>Hello, my name is <%this.name%>. I\'m <%this.age%> years old.</p>. My compnay is <%this.info.company%>"

const body =  'console.log("my name is "+ this.name+"age is"+ this.age+"work at"+ this.info.company)';
// template(str,{
//     name: "zwd",
//     age: 29,
//     info:{
//         company:"netease"
//     }
// })
const template = new Function(body)
template.apply({
    name: "zwd",
    age: 29,
    info:{
        company:"netease"
    }
})