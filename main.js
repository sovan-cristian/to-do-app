const ACTION ={
    DELETE: '0',
    EDIT: '1'
}

const mainContainer = document.querySelector('#todo-container');
const addTodoButton = document.querySelector('#todo-add');
const todoForm = document.querySelector('#todo-form');
const saveTodoButton = document.querySelector('#todo-save');
const cancelTodoButton = document.querySelector('#todo-cancel');
const formInputTodoName = document.querySelector('#todo-name');

let isEditMode = false;
let editTodoID = null;

(function init(){
    server.getTodos().then(ui.displayTodos);
    mainContainer.addEventListener('click', actionHandler);
    addTodoButton.addEventListener('click', showTodoForm);
    saveTodoButton.addEventListener('click', saveTodoHandler);
    cancelTodoButton.addEventListener('click', cancelTodoHandler);
    formInputTodoName.addEventListener('input', seeFormValidity);
})();



function actionHandler(ev){
    const action = ev.target.dataset["action"];

    if(!action){
        return;
    }

    const todoID = ev.target.dataset["id"];

    if(action === ACTION.DELETE){
        return server.removeTodo(todoID);
    }

    if(action === ACTION.EDIT){
        if(todoForm.classList.contains('d-none')){
            todoForm.classList.remove('d-none');
            isEditMode= true;
            editTodoID = todoID;

            server.getTodo(todoID).then((todo) =>{
                document.forms['todo-form']['todo-name'].value = todo.title;
                document.forms['todo-form']['todo-status'].value = todo.status;
                saveTodoButton.textContent = "Update";
                return
            });
        }else{
            cancelTodoHandler();
        }
       
    }
}

function showTodoForm(){
    if(todoForm.classList.contains('d-none')){
        todoForm.classList.remove('d-none');
    }else{
        cancelTodoHandler();
    }
}


function saveTodoHandler(){
    const payload = {
        title: document.forms['todo-form']['todo-name'].value,
        status: +document.forms['todo-form']['todo-status'].value
    };

    cancelTodoHandler();
    // return isEditMode ? server.updateTodo() : server.addTodo(payload);
    if (isEditMode) {
        server.updateTodo(payload, editTodoID);
        isEditMode = false;
        editTodoID = null;
    } else {
        server.addTodo(payload);  
    } 
};

function cancelTodoHandler(){
    todoForm.classList.add('d-none');
};

function seeFormValidity(event){
    if (event.target.value) {
        saveTodoButton.removeAttribute('disabled');
    } 
};

