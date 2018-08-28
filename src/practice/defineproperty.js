let obj = {};

Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    // value: 'test',
    // writable: true,
    get() {
        return this._name;
    },
    set(name) {
        this._name = name;
    },
});
obj.name = 'ddd';
console.log(obj.name);
