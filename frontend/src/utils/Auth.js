class Auth {
  constructor(config) {
    this.baseUrl = 'https://api.mesto.nastya-kll.nomoredomains.work';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Регистрация пользователя
  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponse);
  }

  // Авторизация пользователя
  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this._checkResponse);
  }

  // Получить данные пользователя для проверки токена
  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }
}

const auth = new Auth();

export default auth;