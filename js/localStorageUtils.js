class CollectionWrapper {
    #collection;

    constructor(localStorageCollectionName) {
        this.#collection = localStorage.getItem(localStorageCollectionName) ? localStorage.getItem(localStorageCollectionName).split(',') : [];
    }

    removeFromCollection(id) {
        const indexOfCurrentListItem = this.#collection.indexOf(id);
        this.#collection.splice(indexOfCurrentListItem, 1);
    }

    addToCollectionIfNotExists(id) {
        if (!this.#collection.includes(id)) {
            this.#collection.push(id);
        }
    }

    saveInLocalStorage(collectionName){
        localStorage.setItem(collectionName, this.#collection.toString());
    }

    getCollection() {
        return this.#collection;
    }
}