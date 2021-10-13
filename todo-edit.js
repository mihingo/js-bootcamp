const titleEl = document.querySelector("#todo-title");
const todoButtonRemove = document.querySelector("#remove-todo");
const todoId = location.hash.substring(1);
const todos = getCachedTodos();
const todo = todos.find((todo) => {
  return todo.id === todoId;
});
if (todo === undefined) {
  location.assign("./index.html");
}

titleEl.value = todo.text;
titleEl.addEventListener("input", (e) => {
  todo.text = e.target.value;
  addCacheTodo(todos);
});
todoButtonRemove.addEventListener("click", () => {
  clearTodoCache(todoId);
  addCacheTodo(todos);
  location.assign("./index.html");
});
