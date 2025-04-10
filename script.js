const mainTodo = document.querySelector(".TodoListElem");
const inputVal = document.getElementById("inputVal");

// ✅ Get saved todos from LocalStorage or return empty array
const getTodoListFromStorage = () => {
  return JSON.parse(localStorage.getItem('MyTodoList')) || [];
};

// ✅ Save current list to LocalStorage
const saveTodoToLocalStorage = () => {
  localStorage.setItem('MyTodoList', JSON.stringify(LocalTodoList));
};

let LocalTodoList = getTodoListFromStorage();

// ✅ Create and show a new task element
const addTodoToDOM = (task) => {
  const divElem = document.createElement("div");
  divElem.classList.add("mainTodoDiv");
  divElem.innerHTML = `<li>${task}</li> <button class="delbtn">Delete</button>`;
  mainTodo.appendChild(divElem);
};

// ✅ Handle adding a new task
const addTodo = (e) => {
  e.preventDefault();
  const todoValue = inputVal.value.trim();
  inputVal.value = "";

  if (todoValue !== "" && !LocalTodoList.includes(todoValue)) {
    LocalTodoList.push(todoValue);
    saveTodoToLocalStorage();
    addTodoToDOM(todoValue);
  }
};

// ✅ Load todos from localStorage on page load
const showTodoList = () => {
  LocalTodoList.forEach((task) => {
    addTodoToDOM(task);
  });
};

// ✅ Handle delete button clicks using event delegation
mainTodo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delbtn")) {
    const taskText = e.target.previousElementSibling.innerText.trim();
    LocalTodoList = LocalTodoList.filter(task => task.trim() !== taskText);
    saveTodoToLocalStorage();
    e.target.parentElement.remove();
  }
});


// ✅ Add task on button click
document.querySelector(".btn").addEventListener("click", addTodo);

// Show existing todos on first load
showTodoList();

