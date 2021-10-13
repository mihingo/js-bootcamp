//Read existing data from localStorage
const getCachedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

//Save todo in localStorage
const addCacheTodo = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
//Remove a todo from the localStorage
const clearTodoCache = (id) => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};
//Toggle the completed value of todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};
//Genarate DOM struct for todos
const createNoteDOM = (todo) => {
  const div = document.createElement("div");
  const todoEl = document.createElement("a");
  const completeTodo = document.createElement("input");
  const removeTodo = document.createElement("button");
  //Add the done checkbox
  completeTodo.setAttribute("type", "checkbox");
  completeTodo.checked = todo.completed;
  div.appendChild(completeTodo);
  completeTodo.addEventListener("change", () => {
    toggleTodo(todo.id);
    addCacheTodo(todos);
    renderTodos(todos, filters);
  });
  //Add the todo title tex
  if (todo.text.length > 0) {
    todoEl.textContent = todo.text;
  } else {
    todoEl.textContent = "Empty todo item";
  }
  //Add remove button
  removeTodo.textContent = "x";
  div.appendChild(removeTodo);
  removeTodo.addEventListener("click", () => {
    clearTodoCache(todo.id);
    addCacheTodo(todos);
    renderTodos(todos, filters);
  });
  todoEl.setAttribute("href", `./edit.html#${todo.id}`);
  div.appendChild(todoEl);
  return div;
};

//Render todo App
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(summary);

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(createNoteDOM(todo));
  });
};