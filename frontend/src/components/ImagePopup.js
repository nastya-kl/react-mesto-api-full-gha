import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name='image'>
      <button
          className="popup__close-icon"
          type="button"
          aria-label="Кнопка закрыть окно"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__card-image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
    </Popup>
  );
}

export default ImagePopup;
