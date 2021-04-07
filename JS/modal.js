;(function(){
$(document).ready(()=>{
  const form = document.querySelector(".form");
  const sendBtn = document.querySelector("#sendBtn");
  const closeBtn = document.querySelector("#closeModalBtn");
  const modal = $("#modal");
  const modalText = modal.find(".modal__text");
  
  const phone = document.querySelector("#phone_num");
  
  phone.addEventListener("keydown", e=>{
    let isValid = false;
    try {
      if (e.key>=0 || 
        e.key<=9 || 
        e.key == "+" || 
        e.key == "Enter" || 
        e.key == "ArrowRight" || 
        e.key == "ArrowLeft" || 
        e.key == "Backspace"){
      isValid = true;
    }
    if (!isValid){
      throw new Error("Введите номер в формате +79009998080");
    }
    e.target.nextElementSibling.textContent = ""
    } 
    
    catch (error) {
      e.target.nextElementSibling.textContent = error.message;
      e.preventDefault();
    }
  });

  $(form).submit(e =>{
      e.preventDefault();
      if(validateForm(form)){
        $(modalText).css("color", "black");
        $.ajax({
          url: "https://webdev-api.loftschool.com/sendmail",
          method: "post",
          data: {
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            comment: form.elements.comment.value,
            to: form.elements.to.value,
          },
          success: data => {
            modalText.text(data.message)
          },
          error: data =>{
            console.log(data);
            const ErrMessage = data.responseJSON.message;
            modalText.text(ErrMessage);
            $(modalText).css("color", "red");
          }
        })
        $(modal).css("display", "flex");
      }
    });

  $(closeBtn).on("click", e =>{
    $(modal).css("display", "none");
  })

  function validateForm (form){
    let valid = true;
    if (!validate(form.elements.name)){
      valid = false;
    }
    if (!validate(form.elements.phone)){
      valid = false;
    }
    if (!validate(form.elements.comment)){
      valid = false;
    }
    return valid;
  }
  function validate(element){
    if(!$(element).val().length){
      element.style.border = "1px solid red";
      element.nextElementSibling.textContent = "Заполните это поле"
      return false;
    }else{
      element.style.border = "none";
      return true;
    }
  }
});
})();