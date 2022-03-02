import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector);
      this._handleSubmit = handleSubmit;
      this._form = this._popup.querySelector('.form');
      this._submitButton = this._popup.querySelector('.form__submit-button');
      this._inputs = Array.from(this._popup.querySelectorAll(".form__text-input"));
    }

    _getInputValues() {
        const inputValues = {};

        this._inputs.forEach((input) => {
            inputValues[input.getAttribute('name')] = input.value;
        });

        return inputValues;
    }

    setButtonText(text="Saving...") {
      this._submitButton.textContent = text;
    }

    setEventListeners() {
      this._form.addEventListener("submit", this._handleProfileFormSubmit);
      super.setEventListeners();
    }

    removeEventListeners() {
      this._form.removeEventListener("submit", this._handleProfileFormSubmit);
      super.removeEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _handleProfileFormSubmit = (evt) => {
      evt.preventDefault();
      this._handleSubmit(this, this._getInputValues());
    }
}

export { PopupWithForm }
