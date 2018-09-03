export class Event {
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
    emit(type, args) {
        const arrs = this.listeners[type];
        if (arrs && arrs.length) {
            arrs.forEach(item => {
                item && item(args);
            });
        }
    }
    once(type, listener) {
        const fn = () => {
            this.off(type, fn);
            listener();
        };

        this.on(type, fn);
    }
}

let e1 = new Event();
// const f1 = () => {
//     console.log('click1');
// };
// e1.on('click', f1);
// e1.on('click', () => {
//     console.log('click2');
// });

// e1.off('click', f1);

// console.log(e1.listeners);
// e1.emit('click');

e1.once('clickonce', () => {
    console.log('once');
});

e1.emit('clickonce');
e1.emit('clickonce');
e1.emit('clickonce');