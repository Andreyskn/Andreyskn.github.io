'use strict';
import { tableData } from './tableData';
import dragscroll from "dragscroll";
import PerfectScrollbar from "perfect-scrollbar";

function switchActive(container, setActive) {
    let array = [...container.children];
    array.forEach(element => {
        element.classList.remove('is_active');
    });
    setActive.classList.add('is_active');
}

let tabs = [...document.getElementsByClassName('tabs__link')];
if (tabs.length) {
    tabs.forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();
            if (!e.currentTarget.parentNode.classList.contains('is_active')) {
                switchActive(e.currentTarget.parentNode.parentNode, e.currentTarget.parentNode);
            }
        })
    })
}

let displayOptions = [...document.getElementsByClassName('radio-button')];
if (displayOptions.length) {
    displayOptions.forEach(el => {
        el.addEventListener('click', e => {
            if (!e.currentTarget.parentNode.classList.contains('is_active')) {
                switchActive(e.currentTarget.parentNode.parentNode, e.currentTarget.parentNode);
            }
        })
    })
}

//сортировка по валюте(чекбоксы)
var tableBody = document.getElementById('tableBody');
var checks = [...document.getElementsByClassName('checkbox')];
var checksArr = [];
if (checks.length && tableBody) {
    checks.forEach(checkbox => {
        checkbox.addEventListener('change', e => {

            let _this = e.currentTarget;
            let value = _this.getElementsByClassName('checkbox__input')[0].value;


            if (checksArr.indexOf(value) === -1) {
                checksArr.push(value);
            } else {
                checksArr.splice(checksArr.indexOf(value), 1);
            }

            showRows(checksArr);

        })
    })
}
//сортировка по валюте(чекбоксы)
var sortedArr = [];
function showRows(checksArr) {
    var columnToSort = document.querySelector('[class*="sort_"]');

    if (checksArr.length) {
        sortedArr = tableData.filter(row => checksArr.some(el => row[0].includes(el)));
        columnToSort ? sortTable(columnToSort) : appendRows(sortedArr);
    } else {
        sortedArr = [];
        columnToSort ? sortTable(columnToSort) : appendRows(tableData);
    }
}

function appendRows(arr) {
    if (window.innerWidth <= 650) {
        appendMobileTable(arr);
    } else {
        tableBody.innerHTML = '';
        arr.map(row => {
            let tr = document.createElement('tr');
            tr.classList.add('table__body-row');

            row.map(cell => {
                let td = document.createElement('td');
                td.classList.add('table__body-cell');
                td.append(cell);
                tr.append(td);
            })
            tableBody.append(tr);
        })
        ps.update();
        hideScrollX();
        setClasses();
    }
}
setTimeout(() => {
    appendMobileTable();
}, 1000);
let mobileTable;
function appendMobileTable(arr = tableData) {
    tableFullWrapper.innerHTML = '';

    let mobileTable = document.createElement('div');
    mobileTable.classList.add('mobile-table');

    arr.map(row => {
        let mobileRow = document.createElement('div');
        mobileRow.classList.add('mobile-table__row', 'mobile-table__row_closed');

        let headingsArray = ['', 'Спрэд, пунктов', 'Стоимость пункта в 1 лоте', 'Размер контракта, для 1-го лота', 'Уровни Limit&Stop, пунктов','','', 'Своп long (длинных позиций), в валюте счёта','Своп short (коротких позиций), в валюте счёта'];

        let topRow = document.createElement('div');
        topRow.classList.add('mobile-table__main-row');

        let topCell3 = document.createElement('div');
        topCell3.classList.add('mobile-table__main-cell');

        let heading3 = document.createElement('span');
        heading3.classList.add('mobile-table__cell-heading');
        heading3.innerText = 'Своп';
        topCell3.append(heading3);

        row.map( (cell, index) => {
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
                link.classList.add('mobile-table__button','icon-up-open');
                link.setAttribute('href','#');
                topRow.append(link);
                mobileRow.append(topRow);
            }
            if ([5,6].includes(index)) {
                let value = document.createElement('span');
                value.classList.add('mobile-table__cell-value');
                value.append(cell);
                topCell3.append(value)
            }
            if (![0,5,6].includes(index)) {
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
        tableFullWrapper.append(mobileTable);
    })
    mobileTable = document.getElementsByClassName('mobile-table')[0];
    const buttonArray = [...document.getElementsByClassName('mobile-table__button')];
    buttonArray.map(button => {
        button.addEventListener('click', e => {
            const _this = e.currentTarget;
            const row = _this.parentNode.parentNode;
            const cells = [...row.getElementsByClassName('mobile-table__extra-cell')];

            row.classList.toggle('mobile-table__row_closed');
            row.style.maxHeight = '338px'
            setTimeout(() => {
                cells.map(cell => {
                    cell.style.opacity = '1';
                })
            }, 200);
        })
    })
}

function setClasses() {
    var rows = [...tableBody.getElementsByClassName('table__body-row')];
    rows.map(row => {
        var cells = [...row.getElementsByClassName('table__body-cell')];
        cells.map( (cell, index) => {
            if ([5,6].includes(index)) {
                cell.innerText < 0 ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            }
            if ([7,8].includes(index)) {
                Math.round(Math.random()) ? cell.classList.add('table__body-cell_change_fall') : cell.classList.add('table__body-cell_change_grow');
            }
        })
    })
}

//сортировка по колонкам
let tableColumns = [...document.getElementsByClassName('table__head-cell')];
var tableHeadCells;
if (tableColumns.length) {
    tableColumns.forEach(column => {
        column.addEventListener('click', e => {
            if (e.currentTarget.classList.contains('sort_up')) {
                e.currentTarget.classList.remove('sort_up');
                e.currentTarget.classList.add('sort_down');
                sortTable(e.currentTarget);
            } else if (e.currentTarget.classList.contains('sort_down')) {
                e.currentTarget.classList.remove('sort_down');
                sortTable(e.currentTarget);
            } else {
                tableHeadCells = [...e.currentTarget.parentNode.children];
                tableHeadCells.forEach(el => {
                    el.classList.remove('sort_up', 'sort_down');
                });
                e.currentTarget.classList.add('sort_up');
                sortTable(e.currentTarget);
            }
        })
    })
}

//сортировка по колонкам
function sortTable(columnToSort) {
    var arrayToSort;
    sortedArr.length ? arrayToSort = sortedArr : arrayToSort = tableData;

    var columnId = tableHeadCells.indexOf(columnToSort);

    if (columnToSort.classList.contains('sort_down')) {

        var copyData = arrayToSort.slice();

        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnId)) {
            copyData.sort(function (a, b) {
                return a[columnId] > b[columnId] ? -1 : 1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnId)) {
            copyData.sort(function (a, b) {
                return (parseInt(a[columnId], 10) < parseInt(b[columnId], 10)) ? 1 : -1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnId)) {
            copyData.sort((a, b) => b[columnId] - a[columnId]);
        }

        appendRows(copyData);

    } else if (columnToSort.classList.contains('sort_up')) {

        var copyData = arrayToSort.slice();

        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnId)) {
            copyData.sort(function (a, b) {
                return a[columnId] > b[columnId] ? 1 : -1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnId)) {
            copyData.sort(function (a, b) {
                return (parseInt(a[columnId], 10) < parseInt(b[columnId], 10)) ? -1 : 1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnId)) {
            copyData.sort((a, b) => a[columnId] - b[columnId]);
        }

        appendRows(copyData);

    } else {
        appendRows(arrayToSort);
    }
}

//скролл
const tableContainer = document.querySelector('.data__table');
const tableFullWrapper = document.querySelector('.data__table-wrapper');
let ps, pss;

if (tableContainer && tableFullWrapper) {

    ps = new PerfectScrollbar(tableContainer);
    pss = new PerfectScrollbar(tableFullWrapper);

    tableFullWrapper.addEventListener('scroll', e => {
        tableContainer.scrollLeft = tableFullWrapper.scrollLeft;
        tableContainer.style.left = tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.left;
    })
    window.addEventListener("resize", e => {
        if (window.innerWidth <= 1110) {
            pss.update();
            tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'visible';
        } else if (window.innerWidth <= 650) {
            appendMobileTable();
        } else {
            tableFullWrapper.scrollLeft = 0;
            tableFullWrapper.querySelectorAll('.ps__rail-x')[1].style.visibility = 'hidden';
        }
    });
    hideScrollX();
    blurEdges();
    tableContainer.addEventListener('scroll', e => {
        blurEdges();
    })
}

function hideScrollX() {
    tableContainer.querySelector('.ps__rail-x').style.display = 'none';
};

//скролл
function blurEdges() {
    const table = document.querySelectorAll('table')[1];
    if (table) {
        var tableHeight = parseInt(window.getComputedStyle(table).height);
        var maxScroll = tableHeight - parseInt(window.getComputedStyle(tableContainer).height) - 30;

        if (tableContainer.scrollTop > 0) {
            tableFullWrapper.classList.add('blur_top');
        }
        if (tableContainer.scrollTop === 0) {
            tableFullWrapper.classList.remove('blur_top');
        }
        if (tableContainer.scrollTop > maxScroll) {
            tableFullWrapper.classList.remove('blur_bottom');
        } else {
            tableFullWrapper.classList.add('blur_bottom');
        }
    }
}

//аккордеон
var accordionButton = document.getElementById('accordionButton');
var accordionContent = document.getElementById('accordionContent');
if (accordionButton && accordionContent) {
    var contentHeight = window.getComputedStyle(accordionContent).height;
    accordionButton.addEventListener('click', e => {
        e.preventDefault();
        if (!e.currentTarget.classList.contains('collapsed')) {
            accordionContent.style.opacity = '0';
            accordionContent.style.maxHeight = window.getComputedStyle(accordionContent).height;
            setTimeout(() => {
                accordionContent.classList.add('accordion__item-list_is_closed');
                accordionButton.classList.remove('icon-up-open');
                accordionButton.classList.add('icon-down-open', 'collapsed');
            }, 300);
        } else {
                accordionContent.classList.remove('accordion__item-list_is_closed');
                accordionButton.classList.remove('icon-down-open', 'collapsed');
                accordionButton.classList.add('icon-up-open');
            setTimeout(() => {
                accordionContent.style.opacity = '1';
            }, 300);
        }
    })
}

//поиск
let searchButtons = [...document.getElementsByClassName('search-button')];
var searchBar = document.getElementById('searchBar');
if (searchButtons.length && searchBar) {
    searchButtons.map(el => {
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

var searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', e => {
        var val = searchInput.value.toLowerCase();
        var searchResult = tableData.filter(row => row.some(el => (typeof el == 'string') ? el.toLowerCase().includes(val) : el.toString().includes(val)));
        appendRows(searchResult);
    })
}

let mobileMenu = document.getElementById('mobileMenu');
let menuPanel = document.getElementsByClassName('data__search-panel')[0];
if (mobileMenu) {
    mobileMenu.addEventListener('click', e => {
        e.preventDefault();
        menuPanel.classList.toggle('show');
    })
}


// if (mobileTable) {
//     const buttonArray = [...document.getElementsByClassName('mobile-table__button')];
//     buttonArray.map(button => {
//         button.addEventListener('click', e => {
//             const _this = e.currentTarget;
//             const row = _this.parentNode.parentNode;
//             const cells = [...row.getElementsByClassName('mobile-table__extra-cell')];

//             row.classList.toggle('mobile-table__row_closed');
//             row.style.maxHeight = '338px'
//             setTimeout(() => {
//                 cells.map(cell => {
//                     cell.style.opacity = '1';
//                 })
//             }, 200);
//         })
//     })
// }
