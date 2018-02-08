'use strict';
import { tableData } from './tableData';

function switchActive(container, setActive) {
    let array = [...container.children];
    array.forEach(element => {
        element.classList.remove('is_active');
    });
    setActive.classList.add('is_active');
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

var tableBody = document.getElementById('tableBody');
var checks = [...document.getElementsByClassName('checkbox')];
var checksArr = [];
if (checks.length && tableBody) {
    checks.forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            if (e.currentTarget.getElementsByClassName('checkbox__input')[0].checked) {
                checksArr.push(e.currentTarget.getAttribute('data-value'));
                showRows(checksArr);
            } else {
                checksArr = checksArr.filter(el => el !== e.currentTarget.getAttribute('data-value'));
                showRows(checksArr);
            }
        })
    })
}

var sortedArr = [];
function showRows(checksArr) {
    var columnToSort = document.querySelector('[class*="sort_"]');
    tableBody.innerHTML = '';

    if (checksArr.length) {
        sortedArr = tableData.filter(row => checksArr.some(el => row[0].includes(el)));
        columnToSort ? sortTable(columnToSort, sortedArr) : appendRows(sortedArr);
    } else {
        sortedArr = [];
        columnToSort ? sortTable(columnToSort) : appendRows(tableData);
    }
}

function appendRows(arr) {
    arr.map(row => {
        var tr = document.createElement('tr');
        tr.classList.add('table__body-row');

        row.map(cell => {
            var td = document.createElement('td');
            td.classList.add('table__body-cell');
            td.append(cell);
            tr.append(td);
        })
        tableBody.append(tr);
    })
}

function blurEdges(tableContainer) {
    var wrapper = document.querySelector('.data__table-wrapper');
    var tableHeight = parseInt(window.getComputedStyle(document.querySelector('table')).height)
    if (!tableContainer.classList.contains('data__table_narrow')) {
        var maxScroll = tableHeight - parseInt(window.getComputedStyle(tableContainer).height) - 30;
        if (tableContainer.scrollTop > 0) {
            wrapper.classList.add('blur_top', 'blur_bottom');
        }
        if (tableContainer.scrollTop === 0) {
            wrapper.classList.remove('blur_top');
            wrapper.classList.add('blur_bottom');
        }
        if (tableContainer.scrollTop > maxScroll) {
            wrapper.classList.remove('blur_bottom');
        }
    }
}

var tableContainer = document.querySelector('.data__table');
if (tableContainer) {
    blurEdges(tableContainer);
    tableContainer.addEventListener('scroll', e => {
        blurEdges(e.currentTarget);
    })
}

function resizeTableContainer() {
    var tableHeight = window.getComputedStyle(document.querySelector('table')).height;
    var containerMaxHeight = window.getComputedStyle(document.querySelector('.data__table')).maxHeight
    if (tableHeight < containerMaxHeight) {
        document.querySelector('.data__table').classList.add('data__table_narrow');
    } else {
        document.querySelector('.data__table').classList.remove('data__table_narrow');
    }
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

function sortTable(columnToSort, arrayToSort = tableData) {

    var columnId = tableHeadCells.indexOf(columnToSort);
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

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
        sortedArr.length ? appendRows(sortedArr) : appendRows(tableData);;
    }
}

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
            setTimeout(() => {
                accordionContent.style.display = 'none';
            }, 600);
        } else {
            accordionContent.style.display = 'flex';
            setTimeout(() => {
                accordionContent.classList.remove('accordion__item-list_is_closed');
                accordionButton.classList.remove('icon-down-open', 'collapsed');
                accordionButton.classList.add('icon-up-open');
            }, 0);
            setTimeout(() => {
                accordionContent.style.opacity = '1';
            }, 300);
        }
    })
}

var searchButton = document.getElementById('searchButton');
var searchBar = document.getElementById('searchBar');
if (searchButton && searchBar) {
    searchButton.parentNode.addEventListener('click', e => {
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
}
