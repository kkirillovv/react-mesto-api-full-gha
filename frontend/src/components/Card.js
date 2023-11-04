import React from 'react'
import {CurrentUserContext} from '../context/CurrentUserContext.js'

export default function Card({card, onCardClick, onCardLike, onDeleteClick, setCardDelete}) {

  // контекст текущего юзера
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id)
  
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`) 

  function handledClick () {
		onCardClick(card)
	}

  function handleDeleteClick () {
    onDeleteClick(card)
    setCardDelete(card._id)
  }
  
  function handleCardLike () {
    onCardLike(card)
  }

  return (
		<article className="element">
			<img className="element__photo" src={card.link} alt={card.name} onClick={handledClick} />
			{/* {(card.userId === card.owner._id) ? <button className="element__trash" type="button"></button> : ""} */}
      {isOwn && <button className='element__trash' onClick={ handleDeleteClick } />} 
			<div className="element__block">
				<h3 className="element__title">{card.name}</h3>
				<div>
					{/* <button className={(card.counterLikes > 0) ? `element__like element__like_active` : `element__like`} type="button"></button> */}
          <button className={cardLikeButtonClassName} onClick={ handleCardLike } /> 
					<p className="element__like-counter">{card.likes.length}</p>
				</div>
			</div>
		</article>
  )
}