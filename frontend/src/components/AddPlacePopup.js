import { useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'
import { useForm } from '../hooks/useForm.js'

export default function AddPlacePopup({isOpened, onClose, onAddPlace}) {

  const {values, handleChange, setValues} = useForm({name: '', link: ''})

  useEffect(() => {
    setValues({name: '', link: ''})
  }, [isOpened])

  function handleSubmit (e) {
    e.preventDefault()
    onAddPlace(values)
  }

  return (
    <PopupWithForm 
    name = 'add-photo'
    title = 'Новое место'
    submitButtonText = 'Сохранить'
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit= {handleSubmit}
  >
        <fieldset className="edit-form__set">
          <label className="edit-form__field">
            <input type="text" name="name" value={values.name || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_title" placeholder="Название" required minLength="2" maxLength="30" id="title-input" />
            <span className="edit-form__input-error title-input-error"></span>
          </label>
          <label className="edit-form__field">
            <input type="url" name="link" value={values.link || ""} onChange={ handleChange } className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на картинку" required id="link-input" />
            <span className="edit-form__input-error link-input-error"></span>
          </label>
        </fieldset>
  </PopupWithForm>
  )
}