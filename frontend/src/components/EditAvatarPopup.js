import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditAvatarPopup(props) {
  const { values, handleChange, setValues } = useForm({});
  const { link } = values;

  React.useEffect(() => {
    setValues({});
  }, [props.isOpen, setValues]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: link
    });
  } 

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="info"
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-url-imput"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ''}
          onChange={handleChange}
        />
        <span className="avatar-url-imput-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;