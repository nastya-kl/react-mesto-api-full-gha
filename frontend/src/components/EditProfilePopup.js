import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});
  const { name, job } = values;

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      job: currentUser.about
    })
  }, [currentUser, props.isOpen, setValues]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: job
    });
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="info"
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name-input"
          type="text"
          name="name"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChange}
        />
        <span className="profile-name-input-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_job"
          id="profile-job-input"
          type="text"
          name="job"
          placeholder="Введите описание"
          minLength="2"
          maxLength="200"
          required
          value={job || ''}
          onChange={handleChange}
        />
        <span className="profile-job-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;