class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(this._options.baseUrl+"/cards/", {
            headers: this._options.headers
          })
          .then(this._checkResponse);
    }

    setNewCard( { cardName, cardLink }) {
      return fetch(this._options.baseUrl+"/cards/", {
        method: "POST",
        headers: this._options.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then(this._checkResponse);
    }

    addLike(id) {
      return fetch(this._options.baseUrl+"/cards/likes/"+id, {
        method: "PUT",
        headers: this._options.headers
      })
      .then(this._checkResponse);
    }

    removeLike(id) {
      return fetch(this._options.baseUrl+"/cards/likes/"+id, {
        method: "DELETE",
        headers: this._options.headers
      })
      .then(this._checkResponse);
    }

    deleteCard(id) {
      return fetch(this._options.baseUrl+"/cards/"+id, {
        method: "DELETE",
        headers: this._options.headers
      })
      .then(this._checkResponse);
    }

    getUserInfo() {
      return fetch(this._options.baseUrl+"/users/me", {
        headers: this._options.headers
      })
      .then(this._checkResponse);
    }

    setUserInfo( { newName, newAbout }) {
      return fetch(this._options.baseUrl+"/users/me", {
        method: "PATCH",
        headers: this._options.headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
      .then(this._checkResponse);
    }

    updateAvatar(link) {
      return fetch(this._options.baseUrl+"/users/me/avatar", {
        method: "PATCH",
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(this._checkResponse);
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    }

}

export { Api };
