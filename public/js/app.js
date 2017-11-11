$(document).ready(function () {
    $.getJSON('/api/todos').then(addTodos)
        .catch((error) => {
            console.log(error)
        });
});



function addTodos(todos) {
    todos.forEach((todo) => {
        let newTodo = $('<li>' + todo.content + '</li>');
        if (todo.completed) newTodo.addClass('done');
        $('#list').append(newTodo)
    })
}