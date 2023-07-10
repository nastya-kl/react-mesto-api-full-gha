class Api {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Отображение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse);
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
      .then(this._checkResponse);
  }

  // Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse);
  }

  // Редактирование информации пользователя
  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse);
  }

  // Замена аватара
  changeUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  }

  // Поставить или убрать лайк на карточке
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse);
  }
}

const api = new Api();

export default api;