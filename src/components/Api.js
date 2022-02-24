class Api {
    constructor(options) {
        //TODO
    }

    getInitialCards() {
        //TODO
        return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
            headers: {
              authorization: "b9d1c3b6-c0f4-4224-ad8f-4c81efa3f89d"
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              return Promise.reject(`Error: ${res.status}`);
            }
          })
          .then( res => {
            console.log(res);
            return res;
          })
          .catch( err => {
            // if the server returns an error, reject the promise
            return Promise.reject(`Error: ${res.status}`);
          })
          .finally ( res => {
            console.log("All done");
          })

    }
}

export { Api };
