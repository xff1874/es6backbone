const str="<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>. My compnay is <%info.company%>"

const template = (str,data={})=>{
    const re = /<%(.+?)%>/g;

    let array;
    while((array=re.exec(str))!=null){
        str=str.replace(array[0],data[array[1]])
    }
    console.log(str)

}

template(str,{
    name: "zwd",
    age: 29,
    info:{
        company:"netease"
    }
})
//问题 1. 只能和data绑定,单层结构，为什么？因为直接用【】只能表示一层，无法处理property是对象的结构。。2. if不行。