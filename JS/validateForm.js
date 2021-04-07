;(function(){
const form = document.querySelector(".form");
const send = document.querySelector("#sendBtn");
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


send.addEventListener("click", (e)=>{
  e.preventDefault();
  if (validateForm(form)){
    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comment: form.elements.comment.value,
    };
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(data));

    console.log("Send to a server");
  }else{
    console.log("Error");
  }
});
function validateForm (form){
  console.log(form)
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
  if(!element.checkValidity()){
    element.nextElementSibling.textContent = element.validationMessage;
    element.style.border = "1px solid red";
    return false;
  }else{
    element.nextElementSibling.textContent = "";
    element.style.border = "none";
    return true;
  }

};
})();
