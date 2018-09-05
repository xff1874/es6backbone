import { Model } from '../../../index.js';

// Todo model
class TodoModel extends Model {
    toggle() {
        this.completed = !this.completed;
    }
}
// Todo model has 'title' and 'completed' default attributes.
TodoModel.prototype.defaults = {
    title: '',
    completed: false,
};

export default TodoModel;
