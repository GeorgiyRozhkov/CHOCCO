;(function(){
  let items = document.querySelectorAll(".slide");
  let container = document.querySelector(".slider__list");
  let rightBtn = document.querySelector(".slider__btn_right");
  let leftBtn = document.querySelector(".slider__btn_left");
  let step = setCurrentWidth();

  function setCurrentWidth(){
    let itemWidth = document.querySelector(".slider__list-wrap").clientWidth;
    items.forEach((item)=>{
      item.style.width = `${itemWidth}px`;
    });
    return itemWidth;
  }
  
  let maxRight = step * items.length;
  let currentRight = 0;

  container.style.right = currentRight;

  window.addEventListener("resize", ()=>{
    step = setCurrentWidth();
});

  rightBtn.addEventListener("click", (e)=>{
    changeSlide(e, "right");
  });
  leftBtn.addEventListener("click", (e)=>{
    changeSlide(e, "left");
  });

  function changeSlide(e, direction){
    e.preventDefault();
    if(direction === "right"){
      if(currentRight < maxRight){
        currentRight += step;
        container.style.right = `${currentRight}px`;
      }
      if(currentRight == maxRight){
        currentRight = 0;
        container.style.right = `0px`;
      }
    }else{
      if(currentRight >= 0){
        currentRight -= step;
        container.style.right = `${currentRight}px`;
      }
      if(currentRight < 0){
        currentRight = maxRight - step;
        container.style.right = `${currentRight}px`;
      }
    }
  }

})();