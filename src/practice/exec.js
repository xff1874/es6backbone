const str="<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>"

const template = (str,data={})=>{
    const re = /<%(.+?)%>/g;

    let array;
    while((array=re.exec(str))!=null){
        str=str.replace(array[0],data[array[1]])
    }
    console.log(str)

}

template(str,{
    name: "Krasimir",
    age: 29
})