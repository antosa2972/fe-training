function selectWidgetAndUpdateStorage(e, item, collectionName) {
    let collection = new CollectionWrapper(collectionName);
    const button = e.target.closest('.button-widget');
    const id = item.getAttribute('id');
    if (button.classList.contains('button-widget_active')) {
        collection.removeFromCollection(id);
        button.classList.remove('button-widget_active');
    } else {
        collection.addToCollectionIfNotExists(id);
        button.classList.add('button-widget_active');
    }
    collection.saveInLocalStorage(collectionName);
}

function selectFilterButton(_target) {
    if (_target.classList.contains('filtration-tools__button') && !_target.classList.contains('filtration-tools__button-selected')) {
        document.querySelectorAll('.filtration-tools__button').forEach(function (button) {
            if (button.dataset.filter === _target.dataset.filter) {
                button.classList.add('filtration-tools__button-selected');
            } else {
                button.classList.remove('filtration-tools__button-selected');
            }
        })
    }
    const checkBox = document.querySelector('.filtration-tools__checkbox');
    if (_target.classList.contains('filtration-tools__checkbox')) {
        bookItems.forEach(function (item) {
            const isItemHidden = item.querySelector('.book-item__button-hide').classList.contains('button-widget_active');
            if (isItemHidden) {
                if (checkBox.checked === true) {
                    item.classList.remove('book-item__hidden_by_button');
                } else {
                    item.classList.add('book-item__hidden_by_button');
                }
            }
        });
    }
}


bookItems.forEach(item => {
    const hideButton = item.querySelector('.book-item__button-hide');
    hideButton.addEventListener('click', (e) => {
        selectWidgetAndUpdateStorage(e, item, 'hiddenItems');
    });
    hideButton.addEventListener('click', function () {
        if (item.classList.contains('book-item-halfhidden')) {
            item.classList.remove('book-item-halfhidden');
            item.classList.remove('book-item__hidden_by_button');
        } else {
            item.classList.add('book-item-halfhidden');
            const checkBox = document.querySelector('.filtration-tools__checkbox');
            if (checkBox.checked === false) {
                item.classList.add('book-item__hidden_by_button');
            }
        }
    });

    const favouriteButton = item.querySelector('.book-item__button-favorite');
    favouriteButton.addEventListener('click', (e) => {
        selectWidgetAndUpdateStorage(e, item, 'favoritesItems');
    });

    const compareButton = item.querySelector('.book-item__button-compare');
    compareButton.addEventListener('click', (e) => {
        selectWidgetAndUpdateStorage(e, item, 'comparisonItems');
    });
});

document.querySelector('.filtration-tools').addEventListener('click', function (e) {
    const targetBtn = e.target;
    selectFilterButton(targetBtn);

    const filterType = targetBtn.dataset.filter;
    bookItems.forEach(function (item) {
        switch (filterType) {
            case 'favourites':
                const isFavouriteActive = item.querySelector('.book-item__button-favorite').classList.contains('button-widget_active');
                if (isFavouriteActive) {
                    item.classList.remove('book-item-hidden');
                } else {
                    item.classList.add('book-item-hidden');
                }
                break;
            case 'comparison':
                const isComparisonActive = item.querySelector('.book-item__button-compare').classList.contains('button-widget_active');
                if (isComparisonActive) {
                    item.classList.remove('book-item-hidden');
                } else {
                    item.classList.add('book-item-hidden');
                }
                break;
            case 'all':
                item.classList.remove('book-item-hidden');
                break;
        }
    });
});