class Emitter {
    on(type, listener) {
        if (!this.listeners) this.listeners = {};
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push(listener);
    }
    off(type, listener) {
        if (type) {
            const arrs = this.listeners[type] || [];
            arrs.forEach((item, index) => {
                if (item == listener) {
                    arrs.splice(index, 1);
                    return;
                }
            });
        }
    }
}

let e1 = new Emitter();
const f1 = () => {
    console.log('click1');
};
e1.on('click', f1);
e1.on('click', () => {
    console.log('click2');
});

e1.off('click', f1);

console.log(e1.listeners);
