import PerfectScrollbar from 'perfect-scrollbar';

export default class Render {
    constructor() {
        this.tableBody = null;
        this.tr = null;
        this.td = null;

        this.innerScroll = null;
        this.fullScroll = null;
        this.tableContainer = null;
        this.tableFullWrapper = null;
        this.tableHead = null;

        this.table = null;
        this.tableHeight = null;
        this.maxScroll = null;

        this.rows = [];
        this.cells = [];

        this.mobile = null;

        this.initScroll();
    }

    initScroll() {
        this.tableContainer = document.querySelector('.data__table');
        this.tableFullWrapper = document.querySelector('.data__table-wrapper');
        this.tableHead = document.querySelector('.data__table-head');

        if (this.tableContainer && this.tableFullWrapper) {

            this.innerScroll = new PerfectScrollbar(this.tableContainer);
            this.fullScroll = new PerfectScrollbar(this.tableFullWrapper);

            this.tableFullWrapper.addEventListener('scroll', e => {
                if (!mobile) {
                    this.tableContainer.scrollLeft = this.tableFullWrapper.scrollLeft;
                    this.tableContainer.style.left = this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.left;
                }
            });
            window.addEventListener("resize", e => {
                if (!mobile && window.innerWidth <= 1110) {
                // if (window.innerWidth <= 1110) {
                    this.fullScroll.update();
                    this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'visible';
                    this.tableContainer.style.visibility = 'visible';
                    this.tableHead.style.visibility = 'visible';
                }
                if (!mobile && window.innerWidth > 1110) {
                // if (window.innerWidth > 1110) {
                    this.tableFullWrapper.scrollLeft = 0;
                    this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'hidden';
                }
            });
            this.blurEdges();
            this.tableContainer.addEventListener('scroll', e => {
                this.blurEdges();
            })
            this.hideScrollX();
        }
        if (window.innerWidth <= 650) {
            // appendRows();
            // accordionButton.click();
            tableFullWrapper.classList.remove('blur_bottom');
        }
    }

    hideScrollX() {
        this.tableContainer.querySelector('.ps__rail-x').style.display = 'none';
    }

    blurEdges() {
        this.table = document.querySelectorAll('table')[1];
        if (this.table) {
            this.tableHeight = parseInt(window.getComputedStyle(this.table).height);
            this.maxScroll = this.tableHeight - parseInt(window.getComputedStyle(this.tableContainer).height) - 30;

            if (this.tableContainer.scrollTop > 0) {
                this.tableFullWrapper.classList.add('blur_top');
            }
            if (this.tableContainer.scrollTop === 0) {
                this.tableFullWrapper.classList.remove('blur_top');
            }
            if (this.tableContainer.scrollTop > this.maxScroll) {
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
                this.tr = document.createElement('tr');
                this.tr.classList.add('table__body-row');

                row.map(cell => {
                    this.td = document.createElement('td');
                    this.td.classList.add('table__body-cell');
                    this.td.append(cell);
                    this.tr.append(this.td);
                })
                this.tableBody.append(this.tr);
            })
            this.innerScroll.update();
            this.hideScrollX();
            this.setClasses();
        }
    }

    setClasses() {
        if (mobile) {
            let mainRowCells = [...mobile.querySelectorAll('.mobile-table__main-cell:nth-child(3) .mobile-table__cell-value')];
            let extraCells = [...mobile.querySelectorAll('.mobile-table__extra-cell:nth-child(n+6) .mobile-table__cell-value')];

            mainRowCells.map(cell => {
                cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            });
            extraCells.map(cell => {
                Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            });
        } else {
            this.rows = [...tableBody.getElementsByClassName('table__body-row')];

            this.rows.map(row => {
                this.cells = [...row.getElementsByClassName('table__body-cell')];

                this.cells.map((cell, index) => {
                    if ([5, 6].includes(index)) {
                        cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
                    }
                    if ([7, 8].includes(index)) {
                        Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
                    }
                })
            })
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
                if (index == 0) {
                    let topCell = document.createElement('div');
                    topCell.classList.add('mobile-table__main-cell');

                    let value = document.createElement('span');
                    value.classList.add('mobile-table__cell-value');
                    value.append(cell);
                    topCell.append(value)
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
                    topCell2.append(value2)
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
                    topCell3.append(value)
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
                    extra.append(value)
                    mobileRow.append(extra);
                }
            })

            mobileTable.append(mobileRow);
            this.tableFullWrapper.append(mobileTable);

        })

        this.handleMobileTableButtons();
        this.mobile = document.getElementsByClassName('mobile-table')[0];
        this.setClasses();

        let slashArray = [...document.querySelectorAll('.mobile-table__main-cell:nth-child(3)>.mobile-table__cell-value:nth-child(2)')];
        slashArray.map(el => {
            el.innerText += '\\';
        })
    }

    handleMobileTableButtons() {
        const buttonArray = [...document.getElementsByClassName('mobile-table__button')];

        buttonArray.map(button => {
            button.addEventListener('click', e => {
                const _this = e.currentTarget;
                const row = _this.parentNode.parentNode;

                e.preventDefault();
                row.classList.toggle('mobile-table__row_closed');
            })
        })
    }
}
