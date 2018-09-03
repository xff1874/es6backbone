import { Event } from './Event.mjs';

class Model extends Event {
    constructor(props) {
        super(props)
        this.attributes = Object.assign({}, props);
        this.previous = {};
        Object.keys(this.attributes).forEach(key => {
            this.defineAttribute.bind(this, key);
        });
    }

    defineAttribute(key) {
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
model1.on('title', value => {
    console.log('title is' + vlaue);
});

model1.title = 'testmodel2';