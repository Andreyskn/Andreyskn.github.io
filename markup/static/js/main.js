'use strict';
import {tableData} from 'static/js/tableData';

var displayOptions = document.getElementById('displayOptions');
if (displayOptions) {
    displayOptions.addEventListener('click', function() {
        if (event.target.classList.contains('search-panel__display-options-item') && !event.target.classList.contains('is_active')) {
            let array = [...displayOptions.children];
            array.forEach(element => {
                element.classList.remove('is_active');
            });
            event.target.classList.add('is_active');
        }
    });
}

var mainTabs = document.getElementById('mainTabs');
if (mainTabs) {
    mainTabs.addEventListener('click', function() {
        if (event.target.classList.contains('tabs__link') && !event.target.classList.contains('is_active')) {
            handleTabsActive(mainTabs);
        }
    })
}

var extraTabs = document.getElementById('extraTabs');
if (extraTabs) {
    extraTabs.addEventListener('click', function () {
        if (event.target.classList.contains('tabs__link') && !event.target.classList.contains('is_active')) {
            handleTabsActive(extraTabs);
        }
    })
}

function handleTabsActive(tabsId) {
    let array = [...tabsId.children];
    array.forEach(el => {
        el.querySelector('.tabs__link').classList.remove('is_active');
    });
    event.target.classList.add('is_active');
}

var tableHeadRow = document.getElementById('tableHeadRow');
if (tableHeadRow) {
    tableHeadRow.addEventListener('click', function () {
        if (event.target.classList.contains('table__head-cell')) {
            sortTable(event.target);
        } else if (event.target.parentNode.classList.contains('table__head-cell')) {
            sortTable(event.target.parentNode);
        }
    })
}

var initialRows = [...document.querySelectorAll('.table__body-row')];
var tableBody = document.querySelector('.table__body');
var columnIndex, columnData;
function sortTable(node) {
    if (node.classList.contains('sort_up')) {
        node.classList.remove('sort_up');
        node.classList.add('sort_down');

        var sortedRows = [...document.querySelectorAll('.sorted_row')];
        sortedRows.forEach(el => {
            el.remove();
        });

        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                if (a[0] > b[0]) return -1;
                if (a[0] < b[0]) return 1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                if (parseInt(a[0], 10) > parseInt(b[0], 10)) return -1;
                if (parseInt(a[0], 10) < parseInt(b[0], 10)) return 1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnIndex)) {
            columnData.sort((a, b) => b[0] - a[0]);
        }

        columnData.forEach(el => {
            var sortedRow = initialRows[el[1]].cloneNode(true);
            sortedRow.removeAttribute('style');
            sortedRow.classList.add('sorted_row');
            tableBody.appendChild(sortedRow);
        })

    } else if (node.classList.contains('sort_down')) {
        node.classList.remove('sort_down');
        var sortedRows = [...document.querySelectorAll('.sorted_row')];
        if (sortedRows) {
            sortedRows.forEach(el => {
                el.remove();
            });
        };
        initialRows.forEach(el => {
            el.removeAttribute('style');
        });
    } else {
        initialRows.forEach(el => {
            el.removeAttribute('style');
        });
        var sortedRows = [...document.querySelectorAll('.sorted_row')];
        if (sortedRows) {
            sortedRows.forEach(el => {
                el.remove();
            });
        };
        let array = [...node.parentNode.children];
        array.forEach(el => {
            el.classList.remove('sort_up', 'sort_down');
        });
        node.classList.add('sort_up');
        columnIndex = array.indexOf(node);
        columnData = [];

        tableData.forEach((row,index) => {
            columnData.push([row[columnIndex],index]);
        });
        //works for columns: 1, 2, 5, 8, 9
        if ([0, 1, 4, 7, 8].includes(columnIndex)) {
            columnData.sort(function(a, b) {
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return 0;
            });
        }
        //works for columns: 3, 4
        if ([2, 3].includes(columnIndex)) {
            columnData.sort(function (a, b) {
                if (parseInt(a[0], 10) < parseInt(b[0], 10)) return -1;
                if (parseInt(a[0], 10) > parseInt(b[0], 10)) return 1;
                return 0;
            });
        }
        //works for columns: 6, 7
        if ([5, 6].includes(columnIndex)) {
            columnData.sort((a, b) => a[0] - b[0]);
        }

        columnData.forEach(el => {
            var sortedRow = initialRows[el[1]].cloneNode(true);
            sortedRow.classList.add('sorted_row');
            tableBody.appendChild(sortedRow);
        })

        initialRows.forEach(el => {
            el.style.display = 'none';
        })
    }
}
