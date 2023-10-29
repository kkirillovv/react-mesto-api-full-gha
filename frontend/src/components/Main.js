import React from 'react'
import Card from './Card.js'
import {CurrentUserContext} from '../context/CurrentUserContext.js'

export default function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onDeleteClick, setCardDelete}) {

  // контекст текущего юзера
  const currentUser = React.useContext(CurrentUserContext)

  return (
      <main className="content">
      <section className="profile">
        <button className="profile__avatar" type="button" onClick={() => {onEditAvatar(true)}} style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <button className="profile-info__edit" type="button" aria-label="Редактировать"  onClick={() => {onEditProfile(true)}}></button>
          <p className="profile-info__activity">{currentUser.about}</p>
        </div>
        <button className="profile__add-photo" type="button" aria-label="Добавить фото" onClick={() => {onAddPlace(true)}}></button>
      </section>
      
      <section className="elements" aria-label="Фотогалерея">
        {cards.map((card, i) => {
          return(<Card
            card = {card}
            onCardClick = {onCardClick}
            onCardLike = {onCardLike}
            onDeleteClick = {onDeleteClick}
            setCardDelete = {setCardDelete}
            key={card._id}
          />)
        })}
      </section>
    </main>
  )
}