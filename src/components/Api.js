class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(this._options.baseUrl+"/cards/", {
            headers: this._options.headers
          })
          .then(res => {
            return this._checkResponse(res);
          })
          .then( res => {
            return res;
          })
          .catch( err => {
            // if the server returns an error, reject the promise
            return Promise.reject(`Error: ${err.status}`);
          })
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
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })
    }

    addLike(id) {
      return fetch(this._options.baseUrl+"/cards/likes/"+id, {
        method: "PUT",
        headers: this._options.headers
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })
    }

    removeLike(id) {
      return fetch(this._options.baseUrl+"/cards/likes/"+id, {
        method: "DELETE",
        headers: this._options.headers
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })
    }

    deleteCard(id) {
      return fetch(this._options.baseUrl+"/cards/"+id, {
        method: "DELETE",
        headers: this._options.headers
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}, ${err.body}`);
      })
    }

    getUserInfo() {
      return fetch(this._options.baseUrl+"/users/me", {
        headers: this._options.headers
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })

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
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })

    }

    updateAvatar(link) {
      return fetch(this._options.baseUrl+"/users/me/avatar", {
        method: "PATCH",
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => {
        return this._checkResponse(res);
      })
      .then( res => {
        return res;
      })
      .catch( err => {
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${err.status}`);
      })

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
