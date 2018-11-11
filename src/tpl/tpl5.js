function template() {
    var ntpl = [];
    ntpl.push('My skills:');
    if (this.showSkills) {
        for (var index in this.skills) {
            ntpl.push('   ');
            this.skills[index];
        }
    } else {
        ntpl.push('<p>none</p>');
    }
    return ntpl.join(' ');
}

template.apply({});
