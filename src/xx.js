function test2(model) {
  return  `
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input class="new-todo" placeholder="What needs to be done?" autofocus />
            </header>
            <section class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox" ` +
        (model.todos.length && !model.remaining.length
        ? ' checked'
        : '' )+
          ` />
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"></ul>
            </section>
            <footer class="footer">
            </footer>
        </section>
    `;
}

let re = test2({todos:[],remaining:[]})
