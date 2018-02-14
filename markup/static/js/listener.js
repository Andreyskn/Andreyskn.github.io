import Click from './click';

export default class Listener {
    constructor() {
         this.click = new Click();
    }

    active(links) {
        links.map(el => {
            el.addEventListener('click', e => {
                const _this = e.currentTarget;
                const item = _this.parentNode;

                if (_this.tagName === 'A') {
                    e.preventDefault();
                }
                if (!item.classList.contains('is_active')) {
                    this.click.switchActive(item);
                }
            })
        })
    }

    sortByCurrency(checks) {
        let checksArr = [];

        checks.map(el => {
            el.addEventListener('change', e => {
                const _this = e.currentTarget;
                const value = _this.getElementsByClassName('checkbox__input')[0].value;

                if (checksArr.indexOf(value) === -1) {
                    checksArr.push(value);
                } else {
                    checksArr.splice(checksArr.indexOf(value), 1);
                }
                this.click.showRows(checksArr);
            })
        })
    }

    sortByColumn(tableColumns) {
        tableColumns.forEach(column => {
            column.addEventListener('click', e => {
                const _this = e.currentTarget;

                this.click.columnClick(_this);
            })
        })
    }

    accordion(button, content, contentHeight) {
        button.addEventListener('click', e => {
            const _this = e.currentTarget;
            const accord = _this.parentNode;

            e.preventDefault();
            if (accord.classList.contains('is_closed')) {
                accord.classList.toggle('is_closed');
                setTimeout(() => {
                    content.style.opacity = '1';
                }, 300);
            } else {
                content.style.opacity = '0';
                content.style.maxHeight = contentHeight;
                setTimeout(() => {
                    accord.classList.toggle('is_closed');
                }, 300);
            }
        })
    }

    searchButton(buttons, searchBar) {
        buttons.map(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                searchBar.classList.toggle('search-panel__search-bar_hidden');
                setTimeout(() => {
                    if (!searchBar.classList.contains('search-panel__search-bar_hidden')) {
                        searchBar.querySelector('.search-bar__input').focus();
                    } else {
                        searchBar.querySelector('.search-bar__input').value = '';
                    }
                }, 200);
            })
        })
    }

    searchInput(searchInput) {
        searchInput.addEventListener('input', e => {
            this.click.search(searchInput);
        })
    }

    mobileMenu(mobileMenu) {
        mobileMenu.addEventListener('click', e => {
            e.preventDefault();
            menuPanel.classList.toggle('show');
        })
    }
}
