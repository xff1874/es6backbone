import Event from './Event';
import parseTPL from "./parseTPL";

// events: {
//         'keypress .new-todo': 'onKeyPressNewTodo',
//         'click .clear-completed': 'onClickClearCompleted',
//         'click .toggle-all': 'onClickToggleAll',
//         }

export default class View extends Event {
    constructor(props) {
        super(props);

        this.el = props.el || this.getWrap();
        this.model = props.model || {};
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
    renderTemplate(){
        let template = arguments[0];
        let others = Array.prototype.slice.call(arguments,1);
        const tpl = parseTPL(template);
        const re= tpl.apply(this,others);
        return re
    }
    render() {

        if (this.template) this.el.innerHTML = this.renderTemplate(this.template,this.modal);
        return this;
    }
    $(elem) {
        return this.el.querySelector(elem);
    }

    destroy() {
        this.removeElement();
        this.unbindEvents();
        this.el = null;
    }
    addChild(child) {
        this.children.push(child);
        return child;
    }
    destroyChildren() {
        while(this.children.length){
            let child = this.children.shift();
            child.destroy();
        }

    }
    unbindEvents() {
        //还没有实现。
    }
    removeElement(){
        if(this.el)
        this.el.parentNode.removeChild(this.el);
    }



}
