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

    setUserInfo( { newName, newJob } ) {
        const name = document.querySelector(this._nameSelector);
        const job = document.querySelector(this._jobSelector);

        name.textContent = newName;
        job.textContent = newJob;
    }
}

export { UserInfo };