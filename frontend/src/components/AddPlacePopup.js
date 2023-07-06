import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from '../hooks/useForm';

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});
  const { name, link } = values;

  React.useEffect(() => {
    setValues({});
  }, [props.isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      link: link,
      name: name
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="info"
      buttonText={props.isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-name"
          id="image-name-imput"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name || ''}
          onChange={handleChange}
        />
        <span className="image-name-imput-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-link"
          id="image-url-imput"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={handleChange}
        />
        <span className="image-url-imput-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
