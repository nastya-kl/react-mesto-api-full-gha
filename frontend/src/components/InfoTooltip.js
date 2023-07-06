import React from "react";
import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, isCorrect, title}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name='info'>
      <button
          className="popup__close-icon"
          type="button"
          aria-label="Кнопка закрыть окно"
          onClick={onClose}
        ></button>
        <div className={`popup__auth-image ${isCorrect ? 'popup__auth-image_type_correct' : 'popup__auth-image_type_incorrect'}`}/>
        <h2 className="popup__auth-heading">{title}</h2>
    </Popup>
  )
}

export default InfoTooltip;