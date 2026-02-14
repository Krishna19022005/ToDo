const inputBox =document.getElementById("inputBox");
const addBtn =document.getElementById("addBtn");
const todoList =document.getElementById("todoList");

function clearInput(){
    inputBox.value ="";
}
getFromLocal();

function getFromLocal(){
    let todos = localStorage.getItem("Todos");
    if(todos===null){
        return;
    }
    todos =JSON.parse(todos);

    todos.forEach(ele=>{
        createTodoItem(ele);
    })
}

function saveToLocal(todo){
   
    let todos =localStorage.getItem("Todos");
    if(todos === null){
        todos =[];
    }
    else{
        todos =JSON.parse(todos);
    }

    todos.push(todo);

    localStorage.setItem("Todos",JSON.stringify(todos));
}

function editInLocal(oldInput,newInput){
    let todos = localStorage.getItem("Todos");
    if(todos===null){
        return;
    }
    todos =JSON.parse(todos);

    let idx = todos.indexOf(oldInput);
    if(idx!==-1){
        todos[idx] =newInput;
    }

    localStorage.setItem("Todos", JSON.stringify(todos));
}

function removeFromLocal(li){
    let todos =localStorage.getItem("Todos");
    if(todos === null){
        return;
    }
    else{
        todos =JSON.parse(todos);
    }
    let text = li.children[0].innerHTML;
    let idx = todos.indexOf(text);

    if(idx!==-1)todos.splice(idx,1);
    localStorage.setItem("Todos",JSON.stringify(todos));
}

function createTodoItem(inputText){
    //Creating list Item
    let li =document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML =inputText;
    li.appendChild(p);
    todoList.appendChild(li);

    //div for buttons
    const div =document.createElement("div");

    //creating Edit Button
    const editBtn =document.createElement("button");
    editBtn.innerHTML ="Edit";
    editBtn.classList.add("btn","editBtn")
    div.appendChild(editBtn);

     //creating delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML ="Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    div.appendChild(deleteBtn);

    li.appendChild(div);
}

function addTodo(){
    let inputText = inputBox.value.trim();

    if(inputText.length<1){
        alert("Must Write Someting to add");
        return;
    }

    createTodoItem(inputText);

    clearInput();

    saveToLocal(inputText);
}

const updateTodo =(e)=>{
    if(e.target.innerHTML ==="Remove"){
        todoList.removeChild(e.target.parentElement.parentElement);

        removeFromLocal(e.target.parentElement.parentElement);
    }
    else if(e.target.innerHTML ==="Edit"){
        const li =e.target.parentElement.parentElement;
        let p =li.querySelector("p");

        
        //create input

        let input = document.createElement("input");
        input.type ="text";
        input.value =p.innerHTML;
        input.setAttribute("data-old", p.innerHTML);
        li.insertBefore(input, p);
        li.removeChild(p);

        e.target.innerHTML ="Save";
        li.classList.add("pad");

        
    }
    else if(e.target.innerHTML ==="Save"){
        const li =e.target.parentElement.parentElement;
        let input = li.querySelector("input");
        let p =document.createElement("p");
        p.innerHTML =input.value;
        li.insertBefore(p,input);
        li.removeChild(input);

        li.classList.remove("pad");
        e.target.innerHTML ="Edit";

        let oldInput = input.getAttribute("data-old");

        let newInput = input.value;
        editInLocal(oldInput,newInput);
    }
}

addBtn.addEventListener('click',addTodo);

todoList.addEventListener('click',updateTodo);

inputBox.addEventListener("keypress",(e)=>{
    if(e.key =="Enter"){
        addTodo();
    }
})