const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const dateInput=document.getElementById("dateInput");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  if (taskText === "" || taskDate === "") {
    alert("Please enter a task and date.");
    return;
  }

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-display");
  const datespan =document.createElement("span");
  datespan.classList.add("date-display");
  taskSpan.innerText = "Task:"+taskText;
  datespan.innerText = "Due:"+taskDate;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "Complete";
  completeBtn.classList.add("complete-btn");

  completeBtn.addEventListener("click", function () {
    taskSpan.classList.toggle("completed"); 
    
    if (taskSpan.classList.contains("completed")) {
      completeBtn.innerText = "Undo";
      completeBtn.style.backgroundColor="yellow"; 
      completeBtn.style.color="black";  
    }
    else {
    completeBtn.innerText = "Complete";  
    completeBtn.style.backgroundColor="#28a745"; 
      completeBtn.style.color="white";
  }
  });

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", function () {
    li.remove();
  });

  const taskContainer= document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.appendChild(taskSpan);
  taskContainer.appendChild(datespan);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsContainer.appendChild(completeBtn);
  buttonsContainer.appendChild(removeBtn);

  li.appendChild(taskContainer);
  li.appendChild(buttonsContainer);

  taskList.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
});
