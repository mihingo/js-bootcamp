const titleEl = document.querySelector("#todo-title");
const todoButtonRemove = document.querySelector("#remove-todo");
const todoLastEdit = document.querySelector("#todo-edit-time");
const todoId = location.hash.substring(1);
let todos = getCachedTodos();
let todo = todos.find((todo) => todo.id === todoId);
if (!todo) {
  location.assign("./index.html");
}
titleEl.value = todo.text;
titleEl.addEventListener("input", (e) => {
  todo.text = e.target.value;
  todo.updatedAt = moment().valueOf();
  todoLastEdit.textContent = generateLastEditMsg(todo.updatedAt);
  addCacheTodo(todos);
});

todoLastEdit.textContent = generateLastEditMsg(todo.updatedAt);
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
    if (!todo) {
      location.assign("./index.html");
    }
    titleEl.value = todo.text;
    titleEl.addEventListener("input", (e) => {
      todo.text = e.target.value;
      todo.updatedAt = moment().valueOf();
      todoLastEdit.textContent = generateLastEditMsg(todo.updatedAt);
      addCacheTodo(todos);
    });
  }
});
