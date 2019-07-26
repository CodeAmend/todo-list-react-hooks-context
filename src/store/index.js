export let todos = [
  {
    id: Date.now(),
    name: "Milk"
  },
  {
    id: Date.now(),
    name: "Eggs"
  },
  {
    id: Date.now(),
    name: "Flour",
    done: true
  },
  {
    id: Date.now(),
    name: "Syrup"
  }
];

export function getPendingTodos(todos) {
  return todos.filter(d => !d.done);
}

export function getDoneTodos(todos) {
  return todos.filter(d => d.done);
}

export function addTodo(todo) {
  todos.push(todo);
}

export function removeTodoByID(id) {
  todos = todos.filter(d => d.id !== id);
}

export function toggleTodoByID(id) {
  const todo = todos.find(d => d.id === id);
  todo.done = !todo.done;
}

