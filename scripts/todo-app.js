let todos = getCachedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
  sortBy: "byEdited",
};

renderTodos(todos, filters);

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = uuidv4();
  const timestamp = moment().valueOf();
  let text = e.target.elements.text.value;
  if (text.length > 0) {
    todos.push({
      id: id,
      text: text,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    addCacheTodo(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    todos = JSON.parse(e.newValue);
  }
  renderTodos(todos, filters);
});
