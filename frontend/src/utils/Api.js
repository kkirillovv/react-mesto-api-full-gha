class Api {
  constructor(options) { // инициировали this, сконструировали и вернули его
    this._url = options.baseUrl
  }

  _getStatusData(res) {
    if (res.ok) {
      return res.json() // если все окей, забираем данные в формате json
    } else {
      return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }
  }

  async getInitialCards() { // получаем карточки с БД сервера
    const token = localStorage.getItem('jwt')
    console.log('cards - 1')
    const res = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log('cards - 2')
    return this._getStatusData(res)
  }

  async addNewCard(card) { // добавляем карточку в БД сервера
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    return this._getStatusData(res)
  }

  async deleteCard (cardId) { // удаляем карточку из БД сервера
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return this._getStatusData(res)
  }

  async changeLike (cardId, status) { // изменяем лайк в карточке в БД сервера
    const token = localStorage.getItem('jwt')
    const method = (status) ? 'PUT' : 'DELETE'
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${method}`,
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return this._getStatusData(res)
  }

  async getUserInfo () { // загрузка информации о пользователе из БД сервера
    const token = localStorage.getItem('jwt')
    console.log('user - 1')
    const res = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    console.log('user - 2')
    return this._getStatusData(res)
  }

  async editUserInfo (user) { // редактирование профиля пользователя в БД сервера
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      })
    })
    return this._getStatusData(res)
  }

  async editUserAvatar (user) { // редактирование аватарки пользователя в БД сервера
    const token = localStorage.getItem('jwt')
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: user.avatar,
      })
    })
    return this._getStatusData(res)
  }

  getPageData () {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}

// C. Объявляем Api --------------------------------------------------------

const api = new Api({
// baseUrl: 'http://localhost:3000',
baseUrl: 'https://api.kirillovk.nomoredomainsrocks.ru',
})

export default api