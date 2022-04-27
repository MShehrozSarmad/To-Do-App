let main = document.querySelector("#main");
let inpute = document.getElementById('inpt');
let srch = document.getElementById('search-inpt');
let srchRslt = document.getElementById('srch-rslt');
let  form = document.getElementById("form");
let  form_scrch = document.getElementById("form-srch");
let elmnt = document.getElementsByClassName("task");
const tasksFromLocalStorage = JSON.parse( localStorage.getItem("myTasks") );
let tasks = [];
let clrall = document.getElementById("clearall");

if (tasksFromLocalStorage) {
    tasks = tasksFromLocalStorage;
    render(tasks);
}

function checked(){
    let chkbx = document.querySelectorAll(".chkbx");
    for(let i=0; i<rmv.length; i++){
        chkbx[i].addEventListener('change', function(){
            if (chkbx[i].checked){
                chkbx[i].nextElementSibling.style.textDecoration = "line-through black";
                console.log("working");
            }else{
                chkbx[i].nextElementSibling.style.textDecoration = "none";
                console.log("not working");
            }
        });
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    tasks.push(inpute.value);
    render(tasks);
    //removing dummy task
    if(document.getElementById("dummy")){
        document.getElementById("dummy").remove();
    }
    //remove task
    let rmv = document.querySelectorAll(".rmv");
    for(let i=0; i<rmv.length; i++){
        rmv[i].addEventListener("click", function(){
            rmv[i].parentElement.remove();
        });
    }
    //store
    localStorage.setItem("myTasks", JSON.stringify(tasks) );
    //search reset
    srchRslt.innerText = ``;
    inpute.value = '';
    for(let m=0; m<document.querySelectorAll(".container").length; m++){
        container = document.querySelectorAll(".container")[m];
        container.style.background = "none";
    }

    checked();
});

function render(tsks) {
    let container = "";
    for(let a=0; a<tsks.length; a++){
        container +=`
        <div class="container">
            <input type="checkbox" name="chkbx" class="chkbx">
            <span class="task">${tsks[a]}</span>
            <button class="rmv">Remove</button>
        </div>
        `;
    }
    main.innerHTML = container;
}

let rmv = document.querySelectorAll(".rmv");
let chkbx = document.querySelectorAll(".chkbx");
for(let i=0; i<rmv.length; i++){
    checked();
    //task checked functionality
    // chkbx[i].addEventListener('change', function(){
    //     if (chkbx[i].checked){
    //         chkbx[i].nextElementSibling.style.textDecoration = "line-through black";
    //         console.log("working");
    //     }else{
    //         chkbx[i].nextElementSibling.style.textDecoration = "none";
    //         console.log("not working");
    //     }
    // });
    //remove task functionality
    rmv[i].addEventListener("click", function(){
        rmv[i].parentElement.remove();
        let toPop = rmv[i].previousElementSibling.textContent;
        let toPopInd = tasks.indexOf(toPop);
        tasks.splice(toPopInd, 1);
        localStorage.setItem("myTasks", JSON.stringify(tasks) );
    });
}

form_scrch.addEventListener('submit', function(e){
    e.preventDefault();
    toSearch = srch.value;
    console.log(toSearch);
    let arr =[];
    for(let k=0; k<elmnt.length; k++){
        if(elmnt[k].textContent === toSearch){
            elmnt[k].parentElement.style.background = "#37af65";
            arr.push(k+1);
        }
        else{
            // console.log("Not Found");
            srchRslt.textContent = `Not Found`;
            srchRslt.style.color = "red";

            for(let m=0; m<document.querySelectorAll(".container").length; m++){
                container = document.querySelectorAll(".container")[m];
                container.style.background = "none";
            }
        }

    }
    if(arr.length>0){
        srchRslt.style.color = "green";
        srchRslt.textContent = `Found as Task `;
        for(let l=0; l<arr.length; l++){
            srchRslt.textContent += `${arr[l]} `;
        }
    }
    srch.value = '';
});

clrall.addEventListener("submit", function(){
    localStorage.clear();
    console.log("btn working");
});






/*
form.addEventListener('submit', function(e){
    e.preventDefault();
    //creating div
    let elem = document.createElement("div");
    elem.setAttribute("class", "container");
    //creating span
    let span = document.createElement('span');
    span.setAttribute('class', 'task');
    //creating button
    let btn = document.createElement('button');
    btn.setAttribute('class', 'rmv')
    let txt1 = document.createTextNode("Remove");
    btn.appendChild(txt1);
    elem.appendChild(span);
    elem.appendChild(btn);
    span.innerText = inpute.value;
    main.appendChild(elem);
    //removing dummy task
    if(document.getElementById("dummy")){
        document.getElementById("dummy").remove();
    }
    let rmv = document.querySelectorAll(".rmv");
    for(let i=0; i<rmv.length; i++){
        rmv[i].addEventListener("click", function(){
            rmv[i].parentElement.remove();
        });
    }
    srchRslt.innerText = ``;
    elmnt.parentElement.style.background = "none";
});
*/