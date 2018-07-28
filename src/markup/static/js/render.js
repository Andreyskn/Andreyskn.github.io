import PerfectScrollbar from 'perfect-scrollbar';

export default class Render {
    constructor() {
        this.tableBody = null;
        this.innerScroll = null;
        this.fullScroll = null;
        this.tableContainer = document.querySelector('.data__table');
        this.tableFullWrapper = document.querySelector('.data__table-wrapper');
        this.mobile = null;

        this.initScroll();
    }

    initScroll() {
        if (this.tableContainer && this.tableFullWrapper) {
            const tableHead = document.querySelector('.data__table-head');

            this.innerScroll = new PerfectScrollbar(this.tableContainer);
            this.fullScroll = new PerfectScrollbar(this.tableFullWrapper);

            this.tableFullWrapper.addEventListener('scroll', () => {
                if (!this.mobile) {
                    this.tableContainer.scrollLeft = this.tableFullWrapper.scrollLeft;
                    this.tableContainer.style.left = this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.left;
                }
            });
            window.addEventListener('resize', () => {
                if (!this.mobile && window.innerWidth <= 1110) {
                    this.fullScroll.update();
                    this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'visible';
                    this.tableContainer.style.visibility = 'visible';
                    tableHead.style.visibility = 'visible';
                }
                if (!this.mobile && window.innerWidth > 1110) {
                    this.tableFullWrapper.scrollLeft = 0;
                    this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'hidden';
                }
            });
            this.blurEdges();
            this.tableContainer.addEventListener('scroll', () => {
                this.blurEdges();
            });
            this.hideScrollX();
        }
        if (window.innerWidth <= 650) {
            this.tableFullWrapper.classList.remove('blur_bottom');
        }
    }

    hideScrollX() {
        this.tableContainer.querySelector('.ps__rail-x').style.display = 'none';
    }

    blurEdges() {
        const table = document.querySelectorAll('table')[1];

        if (table) {
            const tableHeight = parseInt(window.getComputedStyle(table).height, 10);
            const maxScroll = tableHeight - parseInt(window.getComputedStyle(this.tableContainer).height, 10) - 30;

            if (this.tableContainer.scrollTop > 0) {
                this.tableFullWrapper.classList.add('blur_top');
            }
            if (this.tableContainer.scrollTop === 0) {
                this.tableFullWrapper.classList.remove('blur_top');
            }
            if (this.tableContainer.scrollTop > maxScroll) {
                this.tableFullWrapper.classList.remove('blur_bottom');
            } else {
                this.tableFullWrapper.classList.add('blur_bottom');
            }
        }
    }

    appendRows(arr) {
        if (window.innerWidth <= 650) {
            this.appendMobileTable(arr);
            this.fullScroll.update();
        } else {
            this.tableBody = document.getElementById('tableBody');

            this.tableBody.innerHTML = '';
            arr.map(row => {
                let tr = document.createElement('tr');
                tr.classList.add('table__body-row');

                row.map(cell => {
                    let td = document.createElement('td');
                    td.classList.add('table__body-cell');
                    td.append(cell);
                    tr.append(td);
                });
                this.tableBody.append(tr);
            });
            this.innerScroll.update();
            this.hideScrollX();
            this.setClasses();
        }
    }

    setClasses() {
        if (this.mobile) {
            let mainRowCells = [...this.mobile.querySelectorAll('.mobile-table__main-cell:nth-child(3) .mobile-table__cell-value')];
            let extraCells = [...this.mobile.querySelectorAll('.mobile-table__extra-cell:nth-child(n+6) .mobile-table__cell-value')];

            mainRowCells.map(cell => {
                return cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            });
            extraCells.map(cell => {
                return Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            });
        } else {
            const rows = [...this.tableBody.getElementsByClassName('table__body-row')];

            rows.map(row => {
                const cells = [...row.getElementsByClassName('table__body-cell')];

                cells.map((cell, index) => {
                    if ([5, 6].includes(index)) {
                        return cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
                    }
                    if ([7, 8].includes(index)) {
                        return Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
                    }
                });
            });
        }
    }

    appendMobileTable(arr) {
        this.tableFullWrapper.innerHTML = '';

        let mobileTable = document.createElement('div');
        mobileTable.classList.add('mobile-table');

        arr.map(row => {
            let mobileRow = document.createElement('div');
            mobileRow.classList.add('mobile-table__row', 'mobile-table__row_closed');

            let headingsArray = ['', 'Спрэд, пунктов', 'Стоимость пункта в 1 лоте', 'Размер контракта, для 1-го лота', 'Уровни Limit&Stop, пунктов', '', '', 'Своп long (длинных позиций), в валюте счёта', 'Своп short (коротких позиций), в валюте счёта'];

            let topRow = document.createElement('div');
            topRow.classList.add('mobile-table__main-row');

            let topCell3 = document.createElement('div');
            topCell3.classList.add('mobile-table__main-cell');

            let heading3 = document.createElement('span');
            heading3.classList.add('mobile-table__cell-heading');
            heading3.innerText = 'Своп';
            topCell3.append(heading3);

            row.map((cell, index) => {
                if (index === 0) {
                    let topCell = document.createElement('div');
                    topCell.classList.add('mobile-table__main-cell');

                    let value = document.createElement('span');
                    value.classList.add('mobile-table__cell-value');
                    value.append(cell);
                    topCell.append(value);
                    topRow.append(topCell);

                    let topCell2 = document.createElement('div');
                    topCell2.classList.add('mobile-table__main-cell');

                    let heading = document.createElement('span');
                    heading.classList.add('mobile-table__cell-heading');
                    heading.innerText = 'Спрэд';
                    topCell2.append(heading);

                    let value2 = document.createElement('span');
                    value2.classList.add('mobile-table__cell-value');
                    value2.innerText = '150';
                    topCell2.append(value2);
                    topRow.append(topCell2);
                    topRow.append(topCell3);

                    let link = document.createElement('a');
                    link.classList.add('mobile-table__button', 'icon-up-open');
                    link.setAttribute('href', '#');
                    topRow.append(link);
                    mobileRow.append(topRow);
                }
                if ([5, 6].includes(index)) {
                    let value = document.createElement('span');
                    value.classList.add('mobile-table__cell-value');
                    value.append(cell);
                    topCell3.append(value);
                }
                if (![0, 5, 6].includes(index)) {
                    let extra = document.createElement('div');
                    extra.classList.add('mobile-table__extra-cell');

                    let heading = document.createElement('span');
                    heading.classList.add('mobile-table__cell-heading');
                    heading.innerText = headingsArray[index];
                    extra.append(heading);

                    let value = document.createElement('span');
                    value.classList.add('mobile-table__cell-value');
                    value.append(cell);
                    extra.append(value);
                    mobileRow.append(extra);
                }
            });

            mobileTable.append(mobileRow);
            this.tableFullWrapper.append(mobileTable);

        });

        this.handleMobileTableButtons();
        this.mobile = document.getElementsByClassName('mobile-table')[0];
        this.setClasses();

        let slashArray = [...document.querySelectorAll('.mobile-table__main-cell:nth-child(3)>.mobile-table__cell-value:nth-child(2)')];
        slashArray.map(el => {
            el.innerText += '\\';
        });
    }

    handleMobileTableButtons() {
        const buttonArray = [...document.getElementsByClassName('mobile-table__button')];

        buttonArray.map(button => {
            button.addEventListener('click', e => {
                const _this = e.currentTarget;
                const row = _this.parentNode.parentNode;

                e.preventDefault();
                row.classList.toggle('mobile-table__row_closed');
            });
        });
    }
}
