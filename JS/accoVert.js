;(function(){
  const btn = document.querySelectorAll(".team__name");
  const descWrap = document.querySelectorAll(".team__desc-wrap");
  const desc = document.querySelectorAll(".team__desc");
  
  function hideAcco(){
    for(let i = 0; i < descWrap.length; i++){
      descWrap[i].style.height = "0px";
      descWrap[i].classList.remove(".team__desc-wrap_active");
      btn[i].classList.remove("team__name_after");
    }
  }
  function showAcco(i){
   let height = getComputedStyle(desc[i]).height;
   descWrap[i].style.height = `${height}`;
   descWrap[i].classList.add(".team__desc-wrap_active");
   btn[i].classList.add("team__name_after");
  }

  for(let i =0; i<btn.length; i++){
    let current = btn[i];

    current.addEventListener("click", (e)=>{
      e.preventDefault();
      if(descWrap[i].classList.contains(".team__desc-wrap_active")){
        hideAcco();
      }else{
        hideAcco();
        showAcco(i);
      }
      

    })
  }
})();