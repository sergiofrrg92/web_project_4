import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitter) {
      super(popupSelector);
      this._submitter = submitter;
      this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        const inputValues = {};
        const inputs = Array.from(this._popup.querySelectorAll(".form__text-input"));

        inputs.forEach((input) => {
            inputValues[input.getAttribute('name')] = input.value;
        });

        return inputValues;
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._handleProfileFormSubmit);
        this._popup.querySelector('.popup__close-button').addEventListener("click", close);
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _handleProfileFormSubmit(evt) {
      evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      hidePopUp(popupEdit);
    }
}

export { PopupWithForm }
