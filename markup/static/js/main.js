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

function sortTable(node) {
    if (node.classList.contains('sort_up')) {
        node.classList.remove('sort_up');
        node.classList.add('sort_down');
    } else if (node.classList.contains('sort_down')) {
        node.classList.remove('sort_down');
    } else {
        let array = [...node.parentNode.children];
        array.forEach(el => {
            el.classList.remove('sort_up', 'sort_down');
        });
        node.classList.add('sort_up');
        var columnIndex = array.indexOf(node);
        var columnData = [];

        tableData.forEach((row,index) => {
            columnData.push([row[columnIndex],index]);
        });
        columnData.sort(function(a, b) {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        });

        console.log(columnData);
    }
}
