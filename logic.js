const canvas = document.getElementById("aesthetic-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const dots = [];
const DOTS = 180;

for (let i = 0; i < DOTS; i++) {
  dots.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    vx: Math.random() * 0.15 - 0.075,
    vy: Math.random() * 0.15 - 0.075,
    alpha: Math.random(),
  });
}

function animate() {
  ctx.fillStyle = "rgba(2,6,23,0.15)";
  ctx.fillRect(0, 0, w, h);

  for (let d of dots) {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0) d.x = w;
    if (d.x > w) d.x = 0;
    if (d.y < 0) d.y = h;
    if (d.y > h) d.y = 0;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148,163,184,${d.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert(" YOu must wrtie something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    let img = document.createElement("img");

    img.src = "images/cross.svg"; 
    img.className = "delete-icon";

    span.appendChild(img);
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click" , function(e){
  if (e.target.classList.contains("delete-icon")) {
        e.target.closest("li").remove();
        saveData();
    }
    else if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        
        saveData();

    }
},false)

function saveData(){
    localStorage.setItem("data" , listContainer.innerHTML )
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();