export default function ImagePopup({card, onClose}) {
	return (
		<div className={(card.link !== '') ? `popup popup_overlay_show-card popup_opened` : `popup popup_overlay_show-card`} id="show">
			<div className="popup__container popup__container_card-details">
				<button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
				<article className="card-details">
					<img className="card-details__image" src={card.link} alt={card.name} />
					<h4 className="card-details__title">{card.name}</h4>
				</article>
			</div>
		</div>
	)
}