import Popup from './Popup.js'

export default function PopupWithForm({name, title, submitButtonText, children, isOpened, onClose, onSubmit}) {
	return ( 
		<Popup 
		name = {`${name}`}
		isOpened = {isOpened}
		onClose = {onClose}
	  >
			<form className="edit-form" name={`${name}`} onSubmit={onSubmit}>
				<h2 className="edit-form__title">{`${title}`}</h2>
				{children}
				<button className="edit-form__button edit-form__button_type_save" type="submit" aria-label={`${submitButtonText}`}>{`${submitButtonText}`}</button>
			</form>
		</Popup>
	)
}