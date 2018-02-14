'use strict';
import { tableData } from './tableData';
import 'dragscroll';
import PerfectScrollbar from 'perfect-scrollbar';
import Listener from './listener';

const listener = new Listener();

const tabs = [...document.getElementsByClassName('tabs__link')];
const displayOptions = [...document.getElementsByClassName('radio-button')];
const activeArray = [...tabs, ...displayOptions];
if (activeArray.length) {
    listener.active(activeArray);
}

//сортировка по валюте(чекбоксы)
let tableBody = document.getElementById('tableBody');
let checks = [...document.getElementsByClassName('checkbox')];
if (checks.length && tableBody) {
    listener.sortByCurrency(checks);
}

//сортировка по колонкам
let tableColumns = [...document.getElementsByClassName('table__head-cell')];
let tableHeadCells;
if (tableColumns.length) {
    listener.sortByColumn(tableColumns);
}

//аккордеон
const accordionButton = document.getElementById('accordionButton');
const accordionContent = document.getElementById('accordionContent');
if (accordionButton && accordionContent) {
    const contentHeight = window.getComputedStyle(accordionContent).height;

    listener.accordion(accordionButton, accordionContent, contentHeight)
}

//поиск
let searchButtons = [...document.getElementsByClassName('search-button')];
let searchBar = document.getElementById('searchBar');
if (searchButtons.length && searchBar) {
    listener.searchButton(searchButtons, searchBar);
}

let searchInput = document.getElementById('searchInput');
if (searchInput) {
    listener.searchInput(searchInput);
}

let mobileMenu = document.getElementById('mobileMenu');
let menuPanel = document.getElementsByClassName('data__search-panel')[0];
if (mobileMenu) {
    listener.mobileMenu(mobileMenu);
}
