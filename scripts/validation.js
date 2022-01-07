const formObject = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__text-input-error_active",
  errorClass: "form__input-error_visible"
};


function showInputError(form, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form.errorClass);
};

function hideInputError(form, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = "";
};

function checkInputValidity(form, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(form, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(form, inputList, buttonElement) {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(form.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(form.inactiveButtonClass);
  }
};

function setEventListeners (form, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);

  toggleButtonState(form, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, formElement, inputElement);
      toggleButtonState(form, inputList, buttonElement);
    });
  });
};

function enableValidation(form) {
  const formList = Array.from(document.querySelectorAll(form.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(form, formElement);
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  });
};

enableValidation(formObject);
