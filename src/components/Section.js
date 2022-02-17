class Section {
    constructor( { items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = "";
    }

    renderer() {
        this.clear();

        this._items.forEach(item => {
          this.addItem(this._renderer(item));
        });
    }

    addItem(item) {
        this._container.prepend(item);
    }
}

export {Section}
