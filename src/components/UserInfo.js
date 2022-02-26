class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
    }

    getUserInfo() {
        return { 
            name: document.querySelector(this._nameSelector).textContent,
            job: document.querySelector(this._jobSelector).textContent
        };
    }

    setUserInfo( { name, about, _id } ) {
        const nameElement = document.querySelector(this._nameSelector);
        const jobElement = document.querySelector(this._jobSelector);

        nameElement.textContent = name;
        jobElement.textContent = about;
        this._id = _id;
    }
}

export { UserInfo };