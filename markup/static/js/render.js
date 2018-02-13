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
                // if (!mobile) {
                this.tableContainer.scrollLeft = this.tableFullWrapper.scrollLeft;
                this.tableContainer.style.left = this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.left;
                // }
            });
            window.addEventListener("resize", e => {
                // if (!mobile && window.innerWidth <= 1110) {
                if (window.innerWidth <= 1110) {
                    this.fullScroll.update();
                    this.tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'visible';
                    this.tableContainer.style.visibility = 'visible';
                    this.tableHead.style.visibility = 'visible';
                }
                // if (!mobile && window.innerWidth > 1110) {
                if (window.innerWidth > 1110) {
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
        // if (window.innerWidth <= 650) {
        //     appendMobileTable(arr);
        //     this.fullScroll.update();
        // } else {
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
        // }
    }

    setClasses() {
        // if (mobile) {
        //     let mainRowCells = [...mobile.querySelectorAll('.mobile-table__main-cell:nth-child(3) .mobile-table__cell-value')];
        //     let extraCells = [...mobile.querySelectorAll('.mobile-table__extra-cell:nth-child(n+6) .mobile-table__cell-value')];

        //     mainRowCells.map(cell => {
        //         cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
        //     });
        //     extraCells.map(cell => {
        //         Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
        //     });
        // } else {
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
    // }
}
