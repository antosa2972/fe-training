//widgets
var favoritesItems = localStorage.getItem('favoritesItems') ? localStorage.getItem('favoritesItems').split(',') : [];
var comparisonItems = localStorage.getItem('comparisonItems') ? localStorage.getItem('comparisonItems').split(',') : [];
var hiddenItems = localStorage.getItem('hiddenItems') ? localStorage.getItem('hiddenItems').split(',') : [];

const bookItems = document.querySelectorAll('.book-item');

bookItems.forEach(item => {

    var hideButton = item.querySelector('.book-item__button-hide');
    hideButton.addEventListener('click', (e) => {
        toggleButton(e, item, hiddenItems, 'hiddenItems');
    });
    hideButton.addEventListener('click', function () {
        if (item.classList.contains('book-item-halfhidden')) {
            item.classList.remove('book-item-halfhidden');
            item.classList.remove('book-item__hidden_by_button');
        } else {
            item.classList.add('book-item-halfhidden');
            item.classList.add('book-item__hidden_by_button');
        }
    })

    var favouriteButton = item.querySelector('.book-item__button-favorite');
    favouriteButton.addEventListener('click', (e) => {
        toggleButton(e, item, favoritesItems, 'favoritesItems');
    });

    var compareButton = item.querySelector('.book-item__button-compare');
    compareButton.addEventListener('click', (e) => {
        toggleButton(e, item, comparisonItems, 'comparisonItems');
    });
})

function toggleButton(e, item, collection, collectionName) {
    var button = e.target;
    if (button.classList.contains('button-widget_active')) {
        var indexOfCurrentListItem = collection.indexOf(item.getAttribute('id'));
        collection.splice(indexOfCurrentListItem, 1);
        button.classList.remove('button-widget_active');
    } else {
        var id = item.getAttribute('id');
        if (!collection.includes(id)) {
            collection.push(id);
        }
        button.classList.add('button-widget_active');
    }
    localStorage.setItem(collectionName, collection.toString());
}

const filtrationTools = document.querySelector('.filtration-tools');

filtrationTools.addEventListener('click', function (e) {
    const _target = e.target;

    if (_target.classList.contains('filtration-tools__button') && !_target.classList.contains('filtration-tools__button-selected')) {
        document.querySelectorAll('.filtration-tools__button').forEach(function (button) {
            if (button.dataset.filter === _target.dataset.filter) {
                button.classList.add('filtration-tools__button-selected');
            } else {
                button.classList.remove('filtration-tools__button-selected');
            }
        })
    }

    var checkBox = document.querySelector('.filtration-tools__checkbox');
    const filterType = _target.dataset.filter;
    bookItems.forEach(function (item) {
        var isFavouriteActive = item.querySelector('.book-item__button-favorite').classList.contains('button-widget_active');
        var isComparisonActive = item.querySelector('.book-item__button-compare').classList.contains('button-widget_active');
        switch (filterType) {
            case 'favourites':
                if (isFavouriteActive) {
                    item.classList.remove('book-item-hidden');
                } else {
                    item.classList.add('book-item-hidden');
                }
                break;
            case 'comparison':
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

    if (_target.classList.contains('filtration-tools__checkbox')) {
        bookItems.forEach(function (item) {
            var isItemHidden = item.querySelector('.book-item__button-hide').classList.contains('button-widget_active');
            if (isItemHidden) {
                if (checkBox.checked === true) {
                    item.classList.remove('book-item__hidden_by_button');
                } else {
                    item.classList.add('book-item__hidden_by_button');
                }
            }
        });
    }
});