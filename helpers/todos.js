const Todo = require('../models/todo');

module.exports = {
    getTodos: (req, res) => {
        Todo.find({}).then((todos) => {
            (todos.length > 0) ? res.send(todos) :
                res.send('NOTHING HERE');
        }).catch((error) => {
            res.send(error)
        });
    },
    createTodo: (req, res) => {
        let { content } = req.body;

        Todo.findOne({ content }).then((todo) => {
            (todo) ? res.send('TODO ALREADY CREATED') :
                Todo.create({ content }).then((createdTodo) => {
                    res.send(createdTodo)
                }).catch((error) => {
                    res.send(error)
                });
        });
    },
    getTodo: (req, res) => {
        let id = req.params.id;
        Todo.findById(id).then((todo) => {
            (todo) ? res.send(todo) :
                res.send('TODO DOES NOT EXIST');
        }).catch((error) => {
            res.send(error)
        });
    },
    removeTodo: (req, res) => {
        let id = req.params.id;
        Todo.findByIdAndRemove(id).then((todo) => {
            (todo) ? res.send(todo) :
                res.send('TODO DOES NOT EXIST');
        }).catch((error) => {
            res.send(error)
        });

    },
    updateTodo: (req, res) => {
        let done;
        let id = req.params.id;
        let { content, completed } = req.body;

        (completed) ? done = true : done = false;

        Todo.findByIdAndUpdate(id,
            { $set: { content, completed: done } },
            { new: true }).then((updatedTodo) => {
                (updatedTodo) ? res.send(updatedTodo) :
                    res.send('TODO DOES NOT EXIST');
            }).catch((error) => {
                res.send(error)
            });
    }
}