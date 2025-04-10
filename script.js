const mainTodo = document.querySelector(".TodoListElem");
const inputVal = document.getElementById("inputVal");
const addBtn = document.querySelector(".btn");

let LocalTodoList = JSON.parse(localStorage.getItem("MyTodoList")) || [];

const saveTodoToLocalStorage = () => {
  localStorage.setItem("MyTodoList", JSON.stringify(LocalTodoList));
};

const showTodoList = () => {
  mainTodo.innerHTML = ""; // Clear previous items

  LocalTodoList.forEach((task) => {
    const divElem = document.createElement("div");
    divElem.classList.add("mainTodoDiv");

    divElem.innerHTML = `
      <li>${task}</li>
      <button class="delbtn">Delete</button>
    `;

    mainTodo.appendChild(divElem);
  });
};

const addTodo = () => {
  const todoValue = inputVal.value.trim();

  if (todoValue !== "" && !LocalTodoList.includes(todoValue)) {
    LocalTodoList.push(todoValue);
    saveTodoToLocalStorage();
    showTodoList();
    inputVal.value = "";
  }
};

mainTodo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delbtn")) {
    const taskText = e.target.previousElementSibling.innerText.trim();
    LocalTodoList = LocalTodoList.filter((task) => task.trim() !== taskText);
    saveTodoToLocalStorage();
    showTodoList();
  }
});

addBtn.addEventListener("click", addTodo);

// Load tasks on page load
showTodoList();
