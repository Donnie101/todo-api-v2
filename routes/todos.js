const Todo = require('../models/todo');
const { getTodos,
    createTodo,
    getTodo,
    removeTodo,
    updateTodo } = require('../helpers/todos')

module.exports = (app) => {
    app.get('/api/todos', getTodos);

    app.post('/api/todos', createTodo);

    app.get('/api/todos/:id', getTodo);

    app.delete('/api/todos/:id', removeTodo);

    app.put('/api/todos/:id', updateTodo);
}