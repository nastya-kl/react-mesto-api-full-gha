import React from 'react';
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
 
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={props.onEditAvatar}>
            <div
              className="profile__avatar"
              style={{
                backgroundImage: `url(${currentUser.avatar})`
              }}>
            </div>
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Кнопка добавления фото"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Секция с блоками фотографий">
        <ul className="elements__container">
          {
            props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                handleClick={() => props.onCardClick(card)}
                handleLikeClick={() => props.onCardLike(card)}
                handleDeleteClick={() => props.onCardDelete(card)}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;