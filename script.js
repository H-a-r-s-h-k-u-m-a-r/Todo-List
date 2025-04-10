const mainTodo = document.querySelector(".TodoListElem");
const inputVal = document.getElementById("inputVal");

let LocalTodoList = JSON.parse(localStorage.getItem("MyTodoList")) || [];

// Save updated list to localStorage
const saveTodoToLocalStorage = () => {
  localStorage.setItem("MyTodoList", JSON.stringify(LocalTodoList));
};

// Create and show all tasks (clears DOM first)
const showTodoList = () => {
  mainTodo.innerHTML = ""; // ✅ Clear existing tasks in UI
  LocalTodoList.forEach((task) => {
    const divElem = document.createElement("div");
    divElem.classList.add("mainTodoDiv");
    divElem.innerHTML = `<li>${task}</li> <button class="delbtn">Delete</button>`;
    mainTodo.appendChild(divElem);
  });
};

// Add new todo
const addTodo = (e) => {
  e.preventDefault();
  const todoValue = inputVal.value.trim();
  inputVal.value = "";

  if (todoValue !== "" && !LocalTodoList.includes(todoValue)) {
    LocalTodoList.push(todoValue);
    saveTodoToLocalStorage();
    showTodoList(); // ✅ Refresh full list
  }
};

// Delete todo using event delegation
mainTodo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delbtn")) {
    const taskText = e.target.previousElementSibling.innerText.trim();
    LocalTodoList = LocalTodoList.filter((task) => task !== taskText);
    saveTodoToLocalStorage();
    showTodoList(); // ✅ Refresh full list after delete
  }
});

// Add button event
document.querySelector(".btn").addEventListener("click", addTodo);

// Initial render on page load
showTodoList();
