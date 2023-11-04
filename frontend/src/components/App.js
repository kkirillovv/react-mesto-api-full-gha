import React, {useEffect, useState} from 'react'
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import DeletePlaceConfirmPopup from './DeletePlaceConfirmPopup.js'
import ImagePopup from './ImagePopup.js'
import InfoToolip from './InfoTooltip.js'
import Register from './Register.js'
import Login from './Login.js'
import ProtectRoute from './ProtectRoute.js'

import api from '../utils/Api.js'
import { CurrentUserContext } from '../context/CurrentUserContext.js'
import * as auth from '../utils/Auth.js'
import iconTrue from '../images/true.png'
import iconFalse from '../images/false.png'

function App() {
 
  // стейты попапов
  const [isEditProfilePopupOpen, onEditProfile] = useState(false)
  const [isAddPlacePopupOpen, onAddPlace] = useState(false)
  const [isEditAvatarPopupOpen, onEditAvatar] = useState(false)
  const [isDeletePlaceConfirmPopupOpen, onDeletePlace] = useState(false)
  const [selectedCard, handleCardClick] = useState({name: '', link: ''})
  const [isInfoToolip, onShowResault] = useState({show: false, icon: '', text: ''}) // cостояния открытия попапа успеха или ошибки регистрации

  // стейты текущего пользователя
  const [currentUser, getUserInfo] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [emailUser, setEmail] = useState('')

  // стейты карточек
  const [cards, getCardsData] = useState([])
  const [deleteCard, handleCardDelete] = useState({_id: ''})

  // стейт навигации
  const [link, handleLink] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email)
          // history.push("/")
          navigate("/main", {replace: true})
        } else {
          return Promise.reject("Токен устарел!")
        }
      }).catch((err) => {
        onShowResault({
          show: true,
          icon: iconFalse,
          text: err
        })
      })

      api.getPageData()
      .then(([user, initialCards]) => {
        getUserInfo(user.data)
        initialCards.forEach((item) => {
          item.userId = user._id
          item.counterLikes = item.likes.length 
        })
        getCardsData(initialCards) 
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
    }
  }, [loggedIn])



  const handleLogin = () => {
    setLoggedIn(true)
  }

  const changeLink = () => {
    handleLink(false)
  }

  function closeAllPopups () {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    onDeletePlace(false)
    handleCardClick({name: '', link: ''})
    handleCardDelete({_id: ''})
    onShowResault({show: false, icon: '', text: ''})
  }

  function closeToolipPopup () {
    if (isInfoToolip.icon === iconTrue) {
      navigate('/sign-in', {replace: true})
      handleLink(true)
    } 
    onShowResault({show: false, icon: '', text: ''})
  }

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id)
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        getCardsData((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }

  function handleUpdateUser (newUserData) {
    api.editUserInfo(newUserData)
      .then((user) => {
        getUserInfo(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }

  function handleUpdateAvatar (newAvatar) {
    api.editUserAvatar(newAvatar)
      .then((user) => {
        getUserInfo(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }

  function handleAddPlace (card) {
    api.addNewCard(card)
      .then((newCard) => {
        getCardsData([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }

  function handleDeletePlace (card) {
    api.deleteCard(card)
    .then((res) => {
      getCardsData((cards) => cards.filter((item) => item._id !== card))
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header isAuth={loggedIn} currentLink={link} email={emailUser}/>
        <main className="content">
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
            <Route path="/main" element={<ProtectRoute
              element={Main} 
              onEditProfile = {onEditProfile}
              onAddPlace = {onAddPlace}
              onEditAvatar = {onEditAvatar}
              cards = {cards}
              onCardClick = {handleCardClick}
              onCardLike = {handleCardLike} 
              onDeleteClick = {onDeletePlace}
              setCardDelete = {handleCardDelete}
              loggedIn={loggedIn}
            />} />
            <Route path="/sign-up" element={<Register changeLink={changeLink} onShowResault={onShowResault}/>} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} setEmail={setEmail} onShowBadResault={onShowResault}/>} /> 
          </Routes>
        </main>  
        <Footer />
      </div>

      <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
      <AddPlacePopup isOpened = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace={handleAddPlace} />
      <DeletePlaceConfirmPopup isOpened = {isDeletePlaceConfirmPopupOpen} onClose = {closeAllPopups} onDelete={handleDeletePlace} cardId = {deleteCard} /> 
      <ImagePopup card = {selectedCard} onClose = {closeAllPopups} />
      <InfoToolip resault ={isInfoToolip} onClose = {closeToolipPopup} />

    </CurrentUserContext.Provider>
  )
}

export default App