'use strict';

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
var buttons = [...document.getElementsByClassName('button')];
if (buttons.length) {
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            if (!e.currentTarget.parentNode.classList.contains('is_active')) {
                switchActive(e.currentTarget.parentNode.parentNode, e.currentTarget.parentNode);
                if (tableBody) {
                    showRows(e.currentTarget.id);
                }
                if (document.querySelector('[class*="sort_"]')) {
                    sortTable(document.querySelector('[class*="sort_"]'));
                }
            }
        })
    })
}

function showRows(buttonId) {
    if (document.getElementById('newTable')) {
        document.getElementById('newTable').remove();
    }
    var moneyArray = [...tableBody.querySelectorAll('.table__body-cell:first-child')];
    var rows = [...tableBody.getElementsByClassName('table__body-row')];
    var newTable = document.createElement('tbody');
    newTable.setAttribute('id','newTable');
    newTable.classList.add('new_table');
    if (buttonId === 'showDollar') {
        moneyArray.forEach((el, index) => {
            if (el.textContent.includes('USD')) {
                var rowClone = rows[index].cloneNode(true);
                newTable.appendChild(rowClone);
            }
        })
        tableBody.style.display = 'none';
        document.querySelector('.table').appendChild(newTable);
    } else if (buttonId === 'showEuro') {
        moneyArray.forEach((el, index) => {
            if (el.textContent.includes('EUR')) {
                var rowClone = rows[index].cloneNode(true);
                newTable.appendChild(rowClone);
            }
        })
        tableBody.style.display = 'none';
        document.querySelector('.table').appendChild(newTable);
    } else {
        tableBody.removeAttribute('style');
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
                resetSort();
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

var columnIndex, columnData, tableToSort, rowsToSort;
function sortTable(node) {
    tableToSort = document.querySelector('tbody:not([style])');
    rowsToSort = [...tableToSort.querySelectorAll('tr:not([class*="sorted"])')];
    if (node.classList.contains('sort_down')) {

        var sortedRows = [...document.querySelectorAll('.sorted_row')];
        sortedRows.forEach(el => {
            el.remove();
        });

        columnIndex = tableHeadCells.indexOf(node);
        columnData = [];

        rowsToSort.forEach((row, index) => {
            columnData.push([row.querySelectorAll('.table__body-cell')[columnIndex].textContent, index]);
        });

        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                return a[0] > b[0] ? -1 : 1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                return (parseInt(a[0], 10) < parseInt(b[0], 10)) ? 1 : -1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnIndex)) {
            columnData.sort((a, b) => b[0] - a[0]);
        }

        columnData.forEach(el => {
            var sortedRow = rowsToSort[el[1]].cloneNode(true);
            sortedRow.removeAttribute('style');
            sortedRow.classList.add('sorted_row');
            tableToSort.appendChild(sortedRow);
        })

    } else if (node.classList.contains('sort_up')) {
        rowsToSort.forEach(el => {
            el.removeAttribute('style');
        });
        var sortedRows = [...document.querySelectorAll('.sorted_row')];
        if (sortedRows.length) {
            sortedRows.forEach(el => {
                el.remove();
            });
        };

        columnIndex = tableHeadCells.indexOf(node);
        columnData = [];

        rowsToSort.forEach((row, index) => {
            columnData.push([row.querySelectorAll('.table__body-cell')[columnIndex].textContent, index]);
        });

        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                return a[0] > b[0] ? 1 : -1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                return (parseInt(a[0], 10) < parseInt(b[0], 10)) ? -1 : 1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnIndex)) {
            columnData.sort((a, b) => a[0] - b[0]);
        }

        columnData.forEach(el => {
            var sortedRow = rowsToSort[el[1]].cloneNode(true);
            sortedRow.classList.add('sorted_row');
            tableToSort.appendChild(sortedRow);
        })

        rowsToSort.forEach(el => {
            el.style.display = 'none';
        })
    }
}

function resetSort() {
    var sortedRows = [...document.querySelectorAll('.sorted_row')];
    if (sortedRows.length) {
        sortedRows.forEach(el => {
            el.remove();
        });
    };
    rowsToSort.forEach(el => {
        el.removeAttribute('style');
    });
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
