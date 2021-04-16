;(function(){
const isPhones = window.matchMedia("(max-width: 480px)").matches;



const mesureWidth = (item) =>{
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".horAcco__list");
  const titlesBlocks = container.find(".horSlide__preview");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".horSlide__content");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isTablets = window.matchMedia("(max-width: 768px)").matches;
  if(isTablets){
    reqItemWidth = screenWidth - titlesWidth; 
  }else{
    reqItemWidth = 464;
  }

  if(isPhones){
    reqItemWidth = screenWidth - titlesBlocks.width();
  }
  return{
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingLeft - paddingRight
  }
  
};


const closeEveryItenInContentainer = (container) => {
  const items = container.find(".horSlide");
  const content = container.find(".horSlide__hidden");

  items.removeClass("active");
  content.width(0);
}

const openItem = item =>{
    const hidden = item.find(".horSlide__hidden");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".horSlide__content");
    textBlock.width(reqWidth.textContainer);
    item.addClass("active");
    hidden.width(reqWidth.container);
}
$(".horSlide__preview").on("click", e =>{
  e.preventDefault();
  const $this = $(e.currentTarget);
  const item = $this.closest(".horSlide");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".horAcco__list")

  if(itemOpened){
    closeEveryItenInContentainer(container);
  }else{
    closeEveryItenInContentainer(container);
    openItem(item);
  }

  if(isPhones){
    $(item).toggleClass("horSlide_mobile");
  }
});
})();