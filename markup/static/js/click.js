import { tableData } from './tableData';
import Sort from './sort'
import Render from './render';

 export default class Click {
    constructor() {
        this.sortedArr = tableData;

        this.sort = new Sort();
        this.render = new Render();

        this.init();
    }

     init() {
         if (window.innerWidth <= 650) {
             this.render.appendRows(tableData);
         }
     }

    switchActive(item) {
        const container = item.parentNode;
        const siblings = [...container.children];

        siblings.forEach(el => {
            el.classList.remove('is_active');
        });
        item.classList.add('is_active');
    }

     showRows(array) {
        const columnToSort = document.querySelector('[class*="sort_"]');
        let arrayToRender;

        if (array.length) {
            this.sortedArr = tableData.filter(row => array.some(el => row[0].includes(el)));

            if (columnToSort) {
                arrayToRender = this.sort.sortTable(columnToSort, this.sortedArr);
            } else {
                arrayToRender = this.sortedArr;
            }
            this.render.appendRows(arrayToRender);

        } else {
            this.sortedArr = tableData;

            if (columnToSort) {
                arrayToRender = this.sort.sortTable(columnToSort, tableData);
            } else {
                arrayToRender = tableData;
            }
            this.render.appendRows(arrayToRender);
        }
     }

     columnClick(item) {
         this.container = item.parentNode;
         this.siblings = [...this.container.children];
         let arrayToRender;

         if (item.classList.contains('sort_up')) {
             item.classList.remove('sort_up');
             item.classList.add('sort_down');

             arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(arrayToRender);

         } else if (item.classList.contains('sort_down')) {
             item.classList.remove('sort_down');

             arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(arrayToRender);

         } else {
             this.siblings.forEach(el => {
                 el.classList.remove('sort_up', 'sort_down');
             });
             item.classList.add('sort_up');

             arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(arrayToRender);
         }
     }

     search(searchInput) {
         let val = searchInput.value.toLowerCase();
         let searchResult = tableData.filter(row => row.some(el => (typeof el == 'string') ? el.toLowerCase().includes(val) : el.toString().includes(val)));
         this.render.appendRows(searchResult);
     }
}
