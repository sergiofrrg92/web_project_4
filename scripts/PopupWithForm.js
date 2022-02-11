class PopupWithForm extends Popup {
    constructor(popupSelector, submitter) {
        this._submitter = submitter;
        super(popupSelector);
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
        //TODO LAST THING I DID
        //add click on close button and submit event handler
        super.setEventListeners();
    }

    close() {
        //clear values when closing.
        super.close();
    }
}