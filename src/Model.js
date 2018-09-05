import Emitter from './Emitter.js';

export default class Model extends Emitter {
    constructor(props) {
        super(props);
        this.attributes = Object.assign({}, props);
        this.previous = {};
        Object.keys(this.attributes).map((key, index) => {
            Object.defineProperty(this, key, {
                get() {
                    return this.attributes[key];
                },
                set(newValue) {
                    this.setValue(key, newValue);
                },
                enumerable: true,
                configurable: true,
            });
        });
    }

    setValue(key, newValue) {
        this.attributes[key] = newValue;
        if (!this.previous[key]) this.previous[key] = newValue;
        else {
            if (this.previous[key] == newValue) return;
        }
        this.emit('change', newValue);
        this.emit(`change:${key}`, newValue);
    }
}

let model1 = new Model({ title: 'testmodel' });
model1.on('change:title', value => {
    console.log('title is' + value);
});

model1.title = 'testmodel2';
