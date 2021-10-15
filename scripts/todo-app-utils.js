//Read existing data from localStorage
const getCachedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

//Save todo in localStorage
const addCacheTodo = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
//Remove a todo from the localStorage
const clearTodoCache = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};
//Toggle the completed value of todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
//Generate DOM struct for todos
const createTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const buttonDiv = document.createElement("div");
  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    addCacheTodo(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the button div
  buttonDiv.classList.add("button-div");
  todoEl.appendChild(buttonDiv);

  // Setup the edit button
  editButton.textContent = "edit";
  editButton.classList.add("button", "button--text", "edit-btn");
  buttonDiv.appendChild(editButton);
  editButton.addEventListener("click", () => {
    location.assign(`edit.html#${todo.id}`);
  });
  // Setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  buttonDiv.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    clearTodoCache(todo.id);
    addCacheTodo(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

//Create the last edited string msg
const generateLastEditMsg = (timestamp) => {
  return `edited ${moment(timestamp).fromNow()}.`;
};

//Add event for the filter drop-down change
const filterBy = document.querySelector("#filter-by");
filterBy.addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderTodos(todos, filters);
});

//Sort the Todo by 3 filters from drop-down
const sortTodos = (todos, sortBy) => {
  if (sortBy === "byEdited") {
    return todos.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return todos.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetically") {
    return todos.sort((a, b) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return -1;
      } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};

//Render todo App
const renderTodos = function (todos, filters) {
  todos = sortTodos(todos, filters.sortBy);
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  const todoEl = document.querySelector("#todos");
  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(function (todo) {
      todoEl.appendChild(createTodoDOM(todo));
    });
  } else {
    const emptyTodoEl = document.createElement("p");
    emptyTodoEl.classList.add("empty-message");
    emptyTodoEl.textContent = "You have no pending tasks, enjoy your day";
    todoEl.appendChild(emptyTodoEl);
  }
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};
