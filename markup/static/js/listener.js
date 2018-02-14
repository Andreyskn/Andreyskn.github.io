import Click from './click';

export default class Listener {
    constructor() {
        this._this = null;
        this.item = null;

        this.value = null;
        this.checksArr = [];
        this.click = new Click();
    }

    active(links) {
        links.map(el => {
            el.addEventListener('click', e => {
                this._this = e.currentTarget;
                this.item = this._this.parentNode;

                if (this._this.tagName === 'A') {
                    e.preventDefault();
                }
                if (!this.item.classList.contains('is_active')) {
                    this.click.switchActive(this.item);
                }
            })
        })
    }

    sortByCurrency(checks) {
        checks.map(el => {
            el.addEventListener('change', e => {
                this._this = e.currentTarget;
                this.value = this._this.getElementsByClassName('checkbox__input')[0].value;

                if (this.checksArr.indexOf(this.value) === -1) {
                    this.checksArr.push(this.value);
                } else {
                    this.checksArr.splice(this.checksArr.indexOf(this.value), 1);
                }
                this.click.showRows(this.checksArr);
            })
        })
    }

    sortByColumn(tableColumns) {
        tableColumns.forEach(column => {
            column.addEventListener('click', e => {
                this._this = e.currentTarget;

                this.click.columnClick(this._this);
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
