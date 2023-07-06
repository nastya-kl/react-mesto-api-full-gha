class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
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
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
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
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // Редактирование информации пользователя
  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
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
      headers: this.headers,
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
      headers: this.headers,
    })
      .then(this._checkResponse);
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'c459a7d9-2d92-4209-961a-1eacde45ecb4',
    'Content-Type': 'application/json'
  },
});

export default api;