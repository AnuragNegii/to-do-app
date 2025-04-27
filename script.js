
const inputTask = document.querySelector(".inputTask")
const mainList = document.querySelector(".mainList");
const addTaskBtn = document.querySelector(".addTask")

addTaskBtn.addEventListener("click", createToDoList);
console.log("This is a message to the console");

function createToDoList(){
    if (inputTask.value === ""){
        alert("add a value");
        return ;
    }
    const newDiv = document.createElement("div");
    const newList = document.createElement("li");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    const para = document.createElement("p");

    button1.textContent = "edit";
    button2.textContent = "delete";
    newList.textContent = inputTask.value.trim();

    console.log(inputTask.value);
    inputTask.value = "";


    mainList.appendChild(newDiv);
    newDiv.appendChild(newList);

    newDiv.appendChild(button1);
    newDiv.appendChild(button2);
}
