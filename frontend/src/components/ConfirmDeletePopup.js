import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();

    props.onDelete(props.card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      buttonText={props.isLoading ? 'Удаление...' : 'Да'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='info'
    />
  );
}

export default ConfirmDeletePopup;