import React from "react";
import Popup from "./Popup";

function PopupWithForm({ isOpen, onClose, onSubmit, name, title, buttonText, children}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className="popup__heading">{title}</h2>
      <form className="popup__form" action="#" name={name} onSubmit={onSubmit}>
        {children}
        <button className="popup__form-button" type="submit">
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
