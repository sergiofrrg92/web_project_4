/**
 * Opens the popup received
 * @param {object} popup
 */
 function openPopUp(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("click", handleClickOnOverlayEvent);
    document.addEventListener("keydown", handleEscapeKeyDown);
  
  }

  /**
 * Closes the popup received
 * @param {*} popup
 */
function hidePopUp(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("click", handleClickOnOverlayEvent);
    document.removeEventListener("keydown", handleEscapeKeyDown);
  }
  

  /**
 * Adds event listeners to popup overlays to close on click.
 */
 function handleClickOnOverlayEvent(evt){
    if(evt.target.classList.contains("popup")){
      hidePopUp(evt.target);
    }
  }

  function handleEscapeKeyDown(evt){
    const openedPopup = document.querySelector('.popup_opened');
    if(evt.key == "Escape" && openedPopup){
      hidePopUp(openedPopup);
    }
  }


export {openPopUp};