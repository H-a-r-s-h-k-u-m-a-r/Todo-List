
    const mainTodo=document.querySelector(".TodoListElem")
		const inputVal=document.getElementById("inputVal")
		
		const getTodoList_fromStorage=(LocalTodoList)=>{
			return JSON.parse(localStorage.getItem('MyTodoList'))
		}
		const addTodoLocalList=()=>{
			return localStorage.setItem('MyTodoList',JSON.stringify(LocalTodoList))
		}

		let LocalTodoList=getTodoList_fromStorage() || []


		const addTodoDynamicElem=(currElem)=>{
			const divElem=document.createElement("div")
			divElem.classList.add("mainTodoDiv");
			divElem.innerHTML=`<li>${currElem}</li> <button class="delbtn">Delete</button>`
			mainTodo.append(divElem)
		}
		
		const addTodoList=(e)=>{
			e.preventDefault();
			const todoListValue=inputVal.value.trim();
			inputVal.value="";
			if(todoListValue!=="" && !LocalTodoList.includes(todoListValue)){
			LocalTodoList.push(todoListValue)
			LocalTodoList=[...new Set(LocalTodoList)]
			console.log(LocalTodoList)
			localStorage.setItem('MyTodoList',JSON.stringify(LocalTodoList))
			addTodoDynamicElem(todoListValue)
			}
		}
		const showTodoList=()=>{
			LocalTodoList.forEach((currElem)=>{
			//	 console.log(LocalTodoList)
				 addTodoDynamicElem(currElem);
			})
		}
		showTodoList();


		const removeTodoElem=(e)=>{
			const todoToRemove=e.target;
			let todoListContent= todoToRemove.previousElementSibling.innerText;
			//console.log (todoToRemove)
			let parentElem= todoToRemove.parentElement;
			console.log (todoListContent)
			LocalTodoList=LocalTodoList.filter((currElem)=>{
				return currElem!==todoListContent.toLowerCase();
			})
		 addTodoLocalList(LocalTodoList)
		 parentElem.remove();
			console.log(LocalTodoList)
		}


		mainTodo.addEventListener('click',(e)=>{
			e.preventDefault();
			removeTodoElem(e);
		})
		document.querySelector(".btn").addEventListener('click',(e)=>{
			addTodoList(e);
		})
