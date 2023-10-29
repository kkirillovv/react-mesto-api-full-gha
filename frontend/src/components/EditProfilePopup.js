import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../context/CurrentUserContext.js'
import { useForm } from '../hooks/useForm.js'

export default function EditProfilePopup({isOpened, onClose, onUpdateUser}) {

  const {values, handleChange, setValues} = useForm({name: '', about: ''})

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values)
  } 

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, isOpened])
  
	return (
    <PopupWithForm 
      name = 'edit-profile'
      title = 'Редактировать профиль'
      submitButtonText = 'Сохранить'
      isOpened = {isOpened}
      onClose = {onClose}
      onSubmit= {handleSubmit}
    >
      <fieldset className="edit-form__set">
        <label className="edit-form__field">
          <input type="text" name="name" value={values.name || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_name" placeholder="Имя" required minLength="2" maxLength="40" id="name-input" />
          <span className="edit-form__input-error name-input-error"></span>
        </label>
        <label className="edit-form__field">
          <input type="text" name="about" value={values.about  || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_activity" placeholder="Деятельность" required minLength="2" maxLength="200" id="activity-input" />
          <span className="edit-form__input-error activity-input-error"></span>
        </label>
      </fieldset>    
    </PopupWithForm>
	)
}