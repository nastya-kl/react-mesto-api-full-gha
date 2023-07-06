import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const likesNumber = props.card.likes.length;
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  return (
    <li className="element">
      { 
        isOwn && <button
        className="element__delete-button"
        type="button"
        aria-label="Кнопка удаления карточки"
        onClick={props.handleDeleteClick}
        ></button>
      }
      <div
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={props.handleClick}
      ></div>
      <div className="element__lower-part">
        <h2 className="element__heading">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={props.handleLikeClick}
            type="button"
            aria-label="Кнопка поставить лайк"
          ></button>
          <p className="element__like-number">{likesNumber}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
