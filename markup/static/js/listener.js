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
}
