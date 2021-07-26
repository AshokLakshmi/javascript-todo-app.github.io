

// Select all Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton=document.getElementById('addBtn');

// Classes names for list item on click changing
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";
let LIST, id;


let data = localStorage.getItem("TODO");


if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
}else{
    
    LIST = [];
    id = 0;
}


function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear all data on click clear icon
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
// clock ///
window.setInterval(clock,1000);
function clock() {
    const options = {weekday : "long", month:"short", day:"numeric"};
const d = new Date();
const  time=d.toLocaleTimeString();
const date=d.toLocaleDateString("en-US", options); 
const dateHTML=`
<p>${time}</p>
<p>${date}</p>
`
dateElement.innerHTML = dateHTML;
    
}



// adding todo item to the html page
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}
// add todo function 
function addTodoToTheList() {
    const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);  
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    
}
// add todo item on add button click
addButton.addEventListener('click',function () {
    addTodoToTheList();
})
// add todo item on enter key press
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        addTodoToTheList();
    }
});



function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}



list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


















