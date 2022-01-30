class FormValidator {
  constructor(settings, form){
    this._settings = settings;
    this._form = form;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };
  
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };
  
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
  
    this._toggleButtonState(inputList, buttonElement);
    const self = this;
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        self._checkInputValidity(formElement, inputElement);
        self._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  resetValidation(formElement){
    const inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }
  
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
    });
  };
}


export {FormValidator};
