function parseValuesIntoItems() {
    const favoritesItems = new CollectionWrapper('favoritesItems').getCollection();
    const hiddenItems = new CollectionWrapper('hiddenItems').getCollection();
    const comparisonItems = new CollectionWrapper('comparisonItems').getCollection();

    const bookItemsOnLoad = document.querySelectorAll('.book-item');
    bookItemsOnLoad.forEach(item => {
        if (favoritesItems.includes(item.id)) {
            parseValue(item.querySelector('.book-item__button-favorite'));
        }
        if (comparisonItems.includes(item.id)) {
            parseValue(item.querySelector('.book-item__button-compare'));
        }
        if (hiddenItems.includes(item.id)) {
            parseValue(item.querySelector('.book-item__button-hide'))
            item.classList.add('book-item-halfhidden');
            item.classList.add('book-item__hidden_by_button');
        }
    });
}

function parseValue(button) {
    button.classList.add('button-widget_active');
}

window.addEventListener('load', parseValuesIntoItems);