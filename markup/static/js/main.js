'use strict';
import { tableData } from './tableData';

/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add' + EventListener;
    var removeEventListener = 'remove' + EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function (i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function (e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function () { pushed = 0; }, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function (e) {
                        if (pushed) {
                            (scroller = el.scroller || el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX = e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY = e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
            })(dragged[i++]);
        }
    }


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));


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
    tableBody.innerHTML = '';
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
    setClasses();
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
function resizeTableContainer() {
    var tableHeight = window.getComputedStyle(document.querySelector('table')).height;
    var containerMaxHeight = window.getComputedStyle(document.querySelector('.data__table')).maxHeight
    if (tableHeight < containerMaxHeight) {
        document.querySelector('.data__table').classList.add('data__table_narrow');
    } else {
        document.querySelector('.data__table').classList.remove('data__table_narrow');
    }
}
//скролл
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
//скролл
var tableContainer = document.querySelector('.data__table');
if (tableContainer) {
    blurEdges(tableContainer);
    tableContainer.addEventListener('scroll', e => {
        blurEdges(e.currentTarget);
    })
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
        menuPanel.classList.toggle('show');
    })
}
