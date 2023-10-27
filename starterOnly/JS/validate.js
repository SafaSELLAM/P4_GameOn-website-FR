//init validation modal
const modalBody = document.querySelector(".modal-body");
const modalValidate = document.querySelector(".modal-validate");
modalValidate.style.display = "none";
//function that will display validation message
function displayValidationMessage() {
  modalBody.style.display = "none";
  modalValidate.style.display = "flex";
  // reset form
  document.getElementById("reserve").reset();
}

//handle errors messages
function validateField(field, checkIfValidate) {
  checkIfValidate()
    ? field.parentElement.removeAttribute("data-error-visible")
    : field.parentElement.setAttribute("data-error-visible", "true");
}

//function that checks inputs values

function validate(event) {
  //prevent form from closing in case of error
  event.preventDefault();
  const firstname = document.getElementById("first");
  const lastname = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const integer = document.getElementById("quantity");
  const termsCheckbox = document.getElementById("checkbox1");
  const location = document.getElementsByName("location");

  // firstname and lastname must be >= 2, return false if not

  validateField(firstname, () => {
    return !(firstname.value.length < 2);
  });

  validateField(lastname, () => {
    return !(lastname.value.length < 2);
  });
  //checks email pattern

  validateField(email, () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return !!emailPattern.test(email.value);
  });

  //controlbirthdate min age =18 and max =65
  validateField(birthdate, () => {
    const minAge = 18;
    const maxAge = 65;
    const birthdateInput = document.getElementById("birthdate");
    const currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - minAge,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const minDate = new Date(
      currentDate.getFullYear() - maxAge,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    // Convert date to  format ISO (aaaa-mm-jj)
    const maxDateISO = maxDate.toISOString().split("T")[0];
    const minDateISO = minDate.toISOString().split("T")[0];

    // Define date min and max
    birthdateInput.setAttribute("max", maxDateISO);
    birthdateInput.setAttribute("min", minDateISO);

    return !!birthdate.validity.valid;
  });

  //checks if it is a number

  validateField(integer, () => {
    return !(integer.value.trim() === "" || isNaN(integer.value));
  });
  //checks all inputs with the name location to see if at least one has been checked
  let radioSelected = false;
  for (const radio of location) {
    if (radio.checked) {
      radioSelected = true;
      break;
    }
  }
  validateField(location[0], () => {
    return !!radioSelected;
  });
  //checks that the terms and condition has been checked
  validateField(termsCheckbox, () => {
    return !!termsCheckbox.checked;
  });
  // if no errors, display the validation message
  if (!document.querySelector(".formData[data-error-visible=true]")) {
    displayValidationMessage();
  }
}

const submit = document.getElementById("button-submit");

submit.addEventListener("click", validate);
