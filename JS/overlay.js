const openBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector(".overlay__cross");
const overlay = document.querySelector("#overlay");

openBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.style.display = "flex";
});

closeBtn.addEventListener("click", e=>{
  overlay.style.display = "none";
})
  
