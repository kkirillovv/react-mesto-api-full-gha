import { useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'
import { useForm } from '../hooks/useForm.js'

export default function EditAvatarPopup({isOpened, onClose, onUpdateUser}) {

  const {values, handleChange, setValues} = useForm({avatar: ''})
  
  useEffect(() => {
    setValues({avatar: ''})
  }, [isOpened])
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values)
  } 

  return (
    <PopupWithForm 
    name = 'edit-avatar'
    title = 'Обновить аватар'
    submitButtonText = 'Сохранить'
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit= {handleSubmit}
    >
      <fieldset className="edit-form__set">
        <label className="edit-form__field">
          <input type="url" name="avatar" value={values.avatar || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на аватарку" required id="avatar-link-input" />
          <span className="edit-form__input-error avatar-link-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}