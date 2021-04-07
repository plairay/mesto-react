class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Данные пользователя с сервера не получены`);
            })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточки с сервера не загружены`);
            })
    }

    setUserInfo(formData) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Данные пользователя не отправлены на сервер`);
            })
    }

    createCard(formData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточка на сервер не добавлена`);
            })
    }

    removeCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Карточку не удалось удалить`);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Лайк не поставлен`);
            })
    }


    unLikeCard(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Лайк не удален`);
            })
    }

    setUserAvatar(formData) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}. Аватар не обновлен`);
            })
    }
}    

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: 'dba9f667-0e97-4319-8dc7-4150f675d4be',
        'Content-Type': 'application/json'
    }
});