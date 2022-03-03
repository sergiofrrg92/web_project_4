class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._jobElement = document.querySelector(this._jobSelector);
        this._avatarElement = document.querySelector(this._avatarSelector);
    }

    getId() {
      if(this._id) {
        return this._id;
      } else {
        return null;
      }
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
            avatar: this._avatarElement.src
        };
    }

    setUserInfo( { name, about, _id, avatar } ) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._avatarElement.src = avatar;
        this._id = _id;
    }
}

export { UserInfo };
