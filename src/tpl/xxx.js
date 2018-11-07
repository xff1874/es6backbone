var ntpl=[];
ntpl.push(My skills:);
if(this.showSkills) {
    for(var index in this.skills)
    {ntpl.push(<a href=\"#\">);ntpl.push(this.skills
[index]);ntpl.push(</a>);}}
else {ntpl.push(<p>none</p>);}