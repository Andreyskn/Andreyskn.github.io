'use strict';

/*
    This file can be used as entry point for webpack!
 */

display_options.addEventListener('click', function() {
    if (!event.target.classList.contains('is_active')) {
        let array = [...display_options.children];
        array.forEach(element => {
            element.classList.remove('is_active');
            element.querySelector('[id*="volumeChoice"]').removeAttribute('checked');
        });
        event.target.classList.add('is_active');
        event.target.querySelector('[id*="volumeChoice"]').setAttribute('checked', 'checked');
    }
});

table_head_row.addEventListener('click', function () {
    console.log(event.target)
})

let tabsArray = [...document.body.querySelectorAll('.tabs')];
tabsArray.forEach(element => {
    element.addEventListener('click', function () {
        if (!event.target.classList.contains('is_active')) {
            let array = [...element.children];
            array.forEach(element => {
                element.querySelector('.tabs__link').classList.remove('is_active');
            });
            event.target.classList.add('is_active');
        }
    })
})
