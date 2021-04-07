;(function(){
const sections = $("section");
const screen = $(".maincontent");
const sideMenu = $(".fix-menu");
const menuItems = sideMenu.find(".fix-menu__item");
const popup = document.querySelector("#overlay");
const openPopupBtn = document.querySelector("#openBtn");
const closePopupBtn = document.querySelector(".overlay__cross");

openPopupBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.style.display = "flex";
});

closePopupBtn.addEventListener("click", e=>{
  e.preventDefault();
  overlay.style.display = "none";
})

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq =>{
  const position = sectionEq * -100;
  
  if (isNaN(position)){
    console.error("передано неверное значение в countSectionPosition")
    return 0
  }
  return position;
};

const changeMenuTheme = (sectionEq) =>{
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fix-menu_shadowed";

  if (menuTheme === "black"){
    sideMenu.addClass(activeClass);
  }else{
    sideMenu.removeClass(activeClass);
  }
}

const resetActiveClassForItem = (items, itemEq, activeClass)=>{
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = function(sectionEq) {
  if(inScroll)return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  const position = countSectionPosition(sectionEq);

  changeMenuTheme(sectionEq)

  screen.css({
      transform: `translateY(${position}%)`
    });

  resetActiveClassForItem(sections, sectionEq, "active");

  resetActiveClassForItem(menuItems, sectionEq, "fix-menu__item_active");

  setTimeout(()=>{
     inScroll = false;
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = function() {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return{
    next(){
      if (nextSection.length){
        performTransition(nextSection.index());
      }
    },
    prev(){
      if (prevSection.length){
        performTransition(prevSection.index());
      }
    }
  }
};

$(window).on("wheel", e =>{
  if (popup.style.display === "flex"){
    return
  }else{
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();
    if (deltaY > 0){
      scroller.next();
    }
    if (deltaY < 0){
      scroller.prev();
    }
  }
})

$(window).on("keydown", e =>{
  const scroller = viewportScroller();
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  if (userTypingInInputs) return;
  switch (e.keyCode){
    case 38:
      scroller.prev();
      break;
    case 40:
      scroller.next();
  }
});
$(".wrap").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`)

  performTransition(reqSection.index());
  popup.style.display = "none";
  
});

if (isMobile){
  $("body").swipe( {
    swipe:function(event, direction,) {
      const scroller = viewportScroller();
      let scrollDirection = "";
      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";
  
      scroller[scrollDirection]();
    }
  });
};
})();

