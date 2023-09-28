const message = document.getElementById("mess");

var listArr=[];
var lastdata = localStorage.getItem("todo");

if(lastdata!==null){
    listArr = JSON.parse(lastdata);
    list();
}
const input = document.querySelector("#data");
input.addEventListener("keyup",e=>{
    if(e.key=="Enter"){
        addtask();
    }
})
let sts = "pending";

function addtask(){
    var time = new Date();
var add = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+"  ";
    var taskName = document.getElementById("data").value.trim();
    if(taskName==""){
        alert("Task can not be empty!");
    }
    else{
        var taskobject = {
            taskId: listArr.length + 1,
            taskName: add+taskName,
            Status:sts
        };
        listArr.push(taskobject);
        localStorage.setItem("todo",JSON.stringify(listArr));
        list();
    }
    document.getElementById("data").value= "";
}

function list(){
    document.querySelectorAll('.section span').forEach(function(span) {
        span.classList.remove('active');
    });
    document.getElementById('all').classList.add('active');

    message.innerHTML=`Total ${listArr.length} tasks`;
    document.getElementById("list").innerHTML = "";
    for(var index=0; index< listArr.length;index++){
        var li = document.createElement("li");
        li.classList.add("task");
        var label = document.createElement("label");
        var para = document.createElement("p");
        para.textContent=listArr[index].taskName;
        label.appendChild(para);
        li.appendChild(label);
        document.getElementById("list").appendChild(li);
        var div = document.createElement("div");
        div.classList.add("edit");
        var check = document.createElement("input");
        check.type= "checkbox";
        if(listArr[index].Status=="pending"){
            check.checked=false;
        }else{
            check.checked=true;
        }
        div.appendChild(check);
        check.addEventListener("click",upadtestatus);
        check.taskId = listArr[index].taskId;
        var edit = document.createElement("i");
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pen-to-square");
        edit.addEventListener("click",edittask);
        edit.taskId = listArr[index].taskId;
        var del = document.createElement("i");
        del.classList.add("fa-solid");
        del.classList.add("fa-trash");
        del.addEventListener("click",deletetask);
        del.taskId = listArr[index].taskId;
        div.appendChild(edit);
        div.appendChild(del);
        document.getElementById("list").appendChild(div);
    }
}
function pendinglist(){
    document.querySelectorAll('.section span').forEach(function(span) {
        span.classList.remove('active');
    });

    // Add 'active' class to the clicked span
    document.getElementById('pending').classList.add('active');
   let count =0;
    document.getElementById("list").innerHTML = "";
    for(var index=0; index< listArr.length;index++){
        if(listArr[index].Status=="pending"){
            count++;
        var li = document.createElement("li");
        li.classList.add("task");
        var label = document.createElement("label");
        var para = document.createElement("p");
        para.textContent=listArr[index].taskName;
        label.appendChild(para);
        li.appendChild(label);
        document.getElementById("list").appendChild(li);
        var div = document.createElement("div");
        div.classList.add("edit");
        var check = document.createElement("input");
        check.type= "checkbox";
        check.checked=false;
        div.appendChild(check);
        check.addEventListener("click",upadtestatus);
        check.taskId = listArr[index].taskId;
        var edit = document.createElement("i");
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pen-to-square");
        edit.addEventListener("click",edittask);
        edit.taskId = listArr[index].taskId;
        var del = document.createElement("i");
        del.classList.add("fa-solid");
        del.classList.add("fa-trash");
        del.addEventListener("click",deletetask);
        del.taskId = listArr[index].taskId;
        div.appendChild(edit);
        div.appendChild(del);
        document.getElementById("list").appendChild(div);
    }
    else{
        continue;
    }
}
    message.innerHTML=`Total ${count} pending tasks`;
}
function completdlist(){
    document.querySelectorAll('.section span').forEach(function(span) {
        span.classList.remove('active');
    });

    // Add 'active' class to the clicked span
    document.getElementById('complete').classList.add('active');
    let num =0;
    document.getElementById("list").innerHTML = "";
    for(var index=0; index< listArr.length;index++){
        if(listArr[index].Status=="completed"){
            num++;
        var li = document.createElement("li");
        li.classList.add("task");
        var label = document.createElement("label");
        var para = document.createElement("p");
        para.textContent=listArr[index].taskName;
        label.appendChild(para);
        li.appendChild(label);
        document.getElementById("list").appendChild(li);
        var div = document.createElement("div");
        div.classList.add("edit");
        var check = document.createElement("input");
        check.classList.add("check");
        check.type= "checkbox";
        check.checked=true;
        check.id=`${index}`;
        div.appendChild(check);
        check.addEventListener("click",upadtestatus);
        check.taskId = listArr[index].taskId;
        var edit = document.createElement("i");
        edit.classList.add("fa-solid");
        edit.classList.add("fa-pen-to-square");
        edit.addEventListener("click",edittask);
        edit.taskId = listArr[index].taskId;
        var del = document.createElement("i");
        del.classList.add("fa-solid");
        del.classList.add("fa-trash");
        del.addEventListener("click",deletetask);
        del.taskId = listArr[index].taskId;
        div.appendChild(edit);
        div.appendChild(del);
        document.getElementById("list").appendChild(div);
    }
    else{
        continue;
    }
}
message.innerHTML=`Total ${num}  completed tasks`;
}
function upadtestatus(event){
    var index = listArr.findIndex(a=>a.taskId==event.target.taskId);
    check = document.getElementById(`${index}`);
    if(listArr[index].Status=="completed"){
        listArr[index].Status="pending";
        console.log(listArr);
        localStorage.setItem("todo",JSON.stringify(listArr));
    }
    else{
        listArr[index].Status="completed";
        console.log(listArr);
    
        localStorage.setItem("todo",JSON.stringify(listArr));
    }
    
}
function edittask(event){
    var data = listArr.find(a=>a.taskId==event.target.taskId);
    document.getElementById("data").value= data.taskName;
    var index = listArr.findIndex(a=>a.taskId==event.target.taskId);
    listArr.splice(index,1);
    localStorage.setItem("todo",JSON.stringify(listArr));
     list();
}
function deletetask(event){
   var index = listArr.findIndex(a=>a.taskId==event.target.taskId);
  listArr.splice(index,1);
  localStorage.setItem("todo",JSON.stringify(listArr));
  list();
}
function clearall(){
    if(confirm("you want to delete all task!")){
        listArr.splice(0);
        localStorage.setItem("todo",JSON.stringify(listArr));
        list();
    }   
}