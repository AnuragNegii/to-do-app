
const inputTask = document.querySelector(".inputTask")
const mainList = document.querySelector(".mainList");
const addTaskBtn = document.querySelector(".addTask")

inputTask.focus();
addTaskBtn.addEventListener("click", createToDoList);

inputTask.addEventListener("keydown", function(event){
  if (event.key === "Enter"){
    console.log("Event enter fired");
    createToDoList();
  }
});

function createToDoList(){
  if(inputTask.value === ""){
    alert("add a Task");
    return;
  }

  //Creating nesseccary elements for the list to add
  const div = document.createElement("div");
  const list= document.createElement("li");
  const checkbox= document.createElement("input");
  checkbox.type = "checkbox";
  const button= document.createElement("button");
  button.textContent = "delete";
  const para = document.createElement("p");
  para.textContent = inputTask.value.trim();
  inputTask.value = "";
  //adding elements to the main List
  mainList.appendChild(list);

  //adding elements to the list so that there is a heirarchy
  list.appendChild(div);
  list.appendChild(checkbox);
  list.appendChild(para);
  list.appendChild(button);

  //delete button functionality 
  button.addEventListener("click", (event) => {
    mainList.removeChild(list);
    saveToLocalStorage();
  });

  //para click event  
  para.addEventListener("click", (event) => {
    replaceWithPara(para, list)
  });

  checkbox.addEventListener("click", (evnet) => {
    if (checkbox.checked){
      para.style.textDecoration = "line-through";
    }else{
      para.style.textDecoration = "";
    }
    saveToLocalStorage();
  });

  saveToLocalStorage();
}

//function for replacing para with input element
function replaceWithPara(para, list){
  const inputForEdit = document.createElement("input");
  inputForEdit.type = "text";
  inputForEdit.value = para.textContent;
  list.replaceChild(inputForEdit, para);
  inputForEdit.focus();
  let isEditing = false;
  //after editing functionality
  inputForEdit.addEventListener("blur", (event)=>{
    if (!isEditing){
      para.textContent = inputForEdit.value;
      list.replaceChild(para, inputForEdit);
      saveToLocalStorage();
    }
  });

}

function saveToLocalStorage(){
  const tasks =[]
  const saveData = document.querySelectorAll(".mainList li")
  saveData.forEach(function(content){
    const text = content.querySelector("p")?.textContent || "";
    const checked = content.querySelector("input[type='checkbox']")?.checked || false; 
    tasks.push({text, checked});
  });
  localStorage.setItem("todoList", JSON.stringify(tasks))
}

function loadingFromLocalStorage(){
  const tasks = JSON.parse(localStorage.getItem("todoList") || "[]");
  tasks.forEach(task=> {
    if(!task.text.trim()) return;
    inputTask.value = task.text;
    createToDoList();
    const lastListItem = mainList.lastElementChild;
    const checkbox = lastListItem.querySelector("input[type='checkbox']");
    const para =  lastListItem.querySelector("p");
    checkbox.checked = task.checked;
    para.style.textDecoration = checkbox.checked ?"line-through" : "";
  });
}

loadingFromLocalStorage();
