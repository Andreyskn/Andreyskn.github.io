'use strict';
import 'dragscroll';
import Listener from './listener';

const documentReady = callback => {
    return document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
};

documentReady(() => {
    const listener = new Listener();

    // табы
    const tabs = [...document.getElementsByClassName('tabs__link')];
    const displayOptions = [...document.getElementsByClassName('radio-button')];
    const activeArray = [...tabs, ...displayOptions];
    if (activeArray.length) {
        listener.active(activeArray);
    }

    // сортировка по валюте(чекбоксы)
    let tableWrapper = document.getElementsByClassName('data__table-wrapper')[0];
    let checks = [...document.getElementsByClassName('checkbox')];
    if (checks.length && tableWrapper) {
        listener.sortByCurrency(checks);
    }

    // сортировка по колонкам
    let tableColumns = [...document.getElementsByClassName('table__head-cell')];
    if (tableColumns.length) {
        listener.sortByColumn(tableColumns);
    }

    // аккордеон
    const accordionButton = document.getElementById('accordionButton');
    const accordionContent = document.getElementById('accordionContent');
    if (accordionButton && accordionContent) {
        const contentHeight = window.getComputedStyle(accordionContent).height;

        listener.accordion(accordionButton, accordionContent, contentHeight);
    }

    // поиск
    let searchButtons = [...document.getElementsByClassName('search-button')];
    let searchBar = document.getElementById('searchBar');
    if (searchButtons.length && searchBar) {
        listener.searchButton(searchButtons, searchBar);
    }

    // поиск
    let searchInput = document.getElementById('searchInput');
    if (searchInput) {
        listener.searchInput(searchInput);
    }

    // мобильное меню
    let mobileMenu = document.getElementById('mobileMenu');
    let menuPanel = document.getElementsByClassName('data__search-panel')[0];
    if (mobileMenu) {
        listener.mobileMenu(mobileMenu, menuPanel);
    }
});
