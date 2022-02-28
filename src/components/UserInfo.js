class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
        return {
            name: document.querySelector(this._nameSelector).textContent,
            job: document.querySelector(this._jobSelector).textContent,
            avatar: document.querySelector(this._avatarSelector).src,
        };
    }

    setUserInfo( { name, about, _id, avatar } ) {
        const nameElement = document.querySelector(this._nameSelector);
        const jobElement = document.querySelector(this._jobSelector);
        const avatarElement = document.querySelector(this._avatarSelector);

        nameElement.textContent = name;
        jobElement.textContent = about;
        avatarElement.src = avatar;
        this._id = _id;
    }
}

export { UserInfo };
