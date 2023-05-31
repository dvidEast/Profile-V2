// main list
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList()

// adds new input 
function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;
  
  todoList.push({
    // name: name,
    //dueDate: dueDate
    name,
    dueDate
  });

  // everytime we add, it clears the input
  inputElement.value = '';
  dateInputElement.value = '';

  // make the visuals now with another function
  renderTodoList();

  // save into storage after adding new input
  saveToStorage()
}

function renderTodoList () {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;  
    //const name = todoObject.name;  
    //const dueDate = todoObject.dueDate;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button class = "delete-todo-button js-delete-todo-button">
        Delete
      </button>
    `;
    todoListHTML += html;
  } 
 
  document.querySelector('.js-todo-list').innerHTML = todoListHTML

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });
}

function addTodoKeyDown(event) {
  if (event.key === 'Enter') {
    addTodo()
  }
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});