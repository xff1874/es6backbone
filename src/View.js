import Emitter from './Emitter';

// events: {
//         'keypress .new-todo': 'onKeyPressNewTodo',
//         'click .clear-completed': 'onClickClearCompleted',
//         'click .toggle-all': 'onClickToggleAll',
//         }

export default class extends Emitter {
    constructor(props) {
        super(props);

        this.el = props.el || this.getWrap();
        this.tpl = props.tpl || '';
        this.model = props.model || {};
        // this.events = props.events || {};
        this.children = [];
        this.delegateEvents();
    }

    delegateEvents() {
        Object.keys(this.events).map((key, index) => {
            const attrs = key.split(' ');
            const type = attrs[0];
            const selector = attrs[1];
            const fn = this.events[key];
            this.el &&
                this.el.addEventListener(type, e => {
                    if (e && e.target.matches(selector)) {
                        this[fn] && this[fn](e);
                    }
                });
        });
    }

    getWrap() {
        return document.createElement('div');
    }
    render() {
        if (this.template) this.el.innerHTML = this.template(this.model);
        return this;
    }
    $(elem) {
        return this.el.querySelector(elem);
    }
    destroyChildren() {
        while (this.children && this.children.length) {
            this.children.shift().destory();
        }
    }
    destory() {
        this.destroyChildren();
        this.unbindEvents();
        this.onDestory();
        this.el = null;
    }
    addChild(child) {
        this.children.push(child);
        // return this;
        return child;
    }
    unbindEvents() {
        //还没有实现。
    }
    //hook函数
    onDestory() {}
}
