import Emitter from './Emitter';

// events: {
//         'keypress .new-todo': 'onKeyPressNewTodo',
//         'click .clear-completed': 'onClickClearCompleted',
//         'click .toggle-all': 'onClickToggleAll',
//         }

export default class extends Emitter {
    constructor(props) {
        super(props);
        this.state = {
            el: props.el || this.getWrap(),
            tpl: props.tpl || '',
            model: props.model || {},
            events: props.events || {},
        };
    }

    handleEvents() {
        Object.keys(this.state.event).map((key, index) => {
            const attrs = key.split(' ');
            const type = attrs[0];
            const selector = attr[1];
            const fn = this.events[key];
            this.el.addEventListener(type, e => {
                if (e && e.target.match(selector)) {
                    fn && fn(e);
                }
            });
        });
    }

    getWrap() {
        this.el = document.createElement('div');
    }
    render() {
        this.el.innerHTML = this.tpl;
    }
    destory() {
        this.state = null;
    }
}
