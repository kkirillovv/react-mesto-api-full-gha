export default function InfoToolip({resault, onClose}) {
	return (
    <div className={(resault.show) ? `popup popup_opened` : `popup`} id="resault">
			<div className="popup__container popup__container_edit-form">
				<button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__toolip-icon" src={resault.icon} alt={resault.text} />
                <h2 className="popup__toolip-info">{resault.text}</h2>
			</div>
		</div>
	)
}