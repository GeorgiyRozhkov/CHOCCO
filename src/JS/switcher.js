;(function(){
const buttons = $(".interactive-avatar");
const display = $(".switcher__item");

buttons.on("click", function(e){
  e.preventDefault();
  const currentIndex = buttons.index(this);
  buttons.removeClass("interactive-avatar_active");
  display.removeClass("switcher__item_active");
  $(this).toggleClass("interactive-avatar_active");
  $(display[currentIndex]).toggleClass("switcher__item_active");
});
})();
