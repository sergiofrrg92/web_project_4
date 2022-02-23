class Api {
    constructor(options) {
        //TODO
    }

    getInitialCards() {
        //TODO
        return fetch("https://around.nomoreparties.co/v1/group-42/cards", {
            headers: {
              authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
            }
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              // if the server returns an error, reject the promise
              return Promise.reject(`Error: ${res.status}`);
            });
    }
}