//show navigation section
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelectorAll(".bground")[1];
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.getElementsByClassName("close")
const closeModalSuccessBtn = document.querySelectorAll(".close-success")
const modalSuccess = document.querySelectorAll('.bground')[0]

// close modal event
closeModalBtn[1].addEventListener("click", function(){closeModal(modalBg)})
closeModalSuccessBtn.forEach((btn) => btn.addEventListener("click", function(){closeModal(modalSuccess)}));


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.className = modalBg.className.split(' ')[0] + " display";
}

//close modals
function closeModal(modal) {
  modal.className = modalBg.className.split(' ')[0] + " hidden"
  if(modal.className==='bground'){
    const formsData = document.querySelectorAll('.formData')
    formsData.forEach((form) => form.setAttribute('data-error-visible', 'false'))
  }
}

//check location form entry
function checkLocation() {
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  const radio = document.querySelector('input[type="radio"]');
  if (radios.length === 0) {
    radio.parentNode.setAttribute('data-error-visible', 'true');
    return false
  }
  if (radio.parentNode.getAttribute('data-error-visible') === 'true') {
    radio.parentNode.setAttribute('data-error-visible', 'false');
  }
  return true
}

//check if utilisation condition are accepted
function checkAcceptedCondition() {
  const acceptedCondition = document.getElementById('checkbox1')
  if (!acceptedCondition.checked) {
    acceptedCondition.parentNode.setAttribute('data-error-visible', 'true');
    return false
  }
  if (acceptedCondition.parentNode.getAttribute('data-error-visible') === 'true') {
    acceptedCondition.parentNode.setAttribute('data-error-visible', 'false');
  }
  return true
}

//check the rest of form entries
function checkFormEntry(elementId, conditionFunction) {
  const entry = document.getElementById(elementId);
  const entryCondition = conditionFunction(entry);
  if (!entryCondition) {
    entry.parentNode.setAttribute('data-error-visible', 'true');
    return false;
  }
  if (entry.parentNode.getAttribute('data-error-visible') === 'true') {
    entry.parentNode.setAttribute('data-error-visible', 'false');
  }
  return true;
}


//function called when submit button is clicked that checked if all entries are well filled
function validate(event) {
  event.preventDefault()
  let isValid = true


  isValid = checkFormEntry('firstname', (entry) => entry.value.length > 2) && isValid;
  isValid = checkFormEntry('lastname', (entry) => entry.value.length > 2) && isValid;
  isValid = checkFormEntry('email', (entry) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.value)) && isValid;
  isValid = checkFormEntry('birthdate', (entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry.value)) && isValid;
  isValid = checkFormEntry('quantity', (entry) => (0 < entry.value && entry.value <= 99)) && isValid
  isValid = checkLocation() && isValid
  isValid = checkAcceptedCondition() && isValid

  if(isValid){
    modalBg.className = modalBg.className.split(' ')[0] + " hidden"
    modalSuccess.className = modalSuccess.className.split(' ')[0] + " display";
    window.scrollTo(0, 0)
  }
}

