let todos = [];
let nextId = 1;

class Todo {
    constructor(title, completed = false, ownerId) {
        this.id = nextId++;
        this.title = title;
        this.completed = completed;
        this.ownerId = ownerId;
    }
}

const findByOwnerId = (ownerId) => {
    return todos.filter(todo => todo.ownerId === ownerId);
};

const findById = (id) => {
    return todos.find(todo => todo.id === parseInt(id));
};

const save = (todo) => {
    if (todo.id) {
        // Update existing todo
        const index = todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
            todos[index] = { ...todos[index], ...todo };
            return todos[index];
        }
    } else {
        // Create new todo
        const newTodo = new Todo(todo.title, todo.completed, todo.ownerId);
        todos.push(newTodo);
        return newTodo;
    }
    return null; // Should not happen if logic is correct
};

const deleteById = (id) => {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    return todos.length < initialLength; // true if a todo was deleted
};

module.exports = {
    findByOwnerId,
    findById,
    save,
    deleteById
};
