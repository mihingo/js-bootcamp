const titleEl = document.querySelector("#todo-title");
const todoButtonRemove = document.querySelector("#remove-todo");
const todoId = location.hash.substring(1);
let todos = getCachedTodos();
let todo = todos.find((todo) => {
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

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    todos = JSON.parse(e.newValue);
    todo = todos.find((todo) => {
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
  }
});
