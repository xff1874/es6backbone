let obj = {
    get name() {
        console.log('getname');
    },
    set name(name) {
        this.alias = name;
        console.log('setname');
    },
};

obj.name = 'testttttt';
obj.name;
console.log(obj.alias);
