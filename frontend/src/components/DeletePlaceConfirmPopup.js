import PopupWithForm from './PopupWithForm.js'

export default function DeletePlaceConfirmPopup({isOpened, onClose, onDelete, cardId}) {

  function handleSubmit (e) {
    e.preventDefault()
    onDelete(cardId)
  }

  return (
    <PopupWithForm 
    name = 'delete-photo'
    title = 'Вы уверены?'
    submitButtonText = 'Да'
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit= {handleSubmit}
    />
  )
}