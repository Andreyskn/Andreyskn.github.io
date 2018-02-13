import { tableData } from './tableData';
import Sort from './sort'
import Render from './render';

 export default class Click {
    constructor() {
        this.container = null;
        this.siblings = null;

        this.sortedArr = tableData;
        this.columnToSort = null;
        this.arrayToRender = [];
        this.sort = new Sort();
        this.render = new Render();
    }

    switchActive(item) {
        this.container = item.parentNode;
        this.siblings = [...this.container.children];

        this.siblings.forEach(el => {
            el.classList.remove('is_active');
        });
        item.classList.add('is_active');
    }

     showRows(array) {
        this.columnToSort = document.querySelector('[class*="sort_"]');

        if (array.length) {
            this.sortedArr = tableData.filter(row => array.some(el => row[0].includes(el)));

            if (this.columnToSort) {
                this.arrayToRender = this.sort.sortTable(this.columnToSort, this.sortedArr);
            } else {
                this.arrayToRender = this.sortedArr;
            }
            this.render.appendRows(this.arrayToRender);

        } else {
            this.sortedArr = tableData;

            if (this.columnToSort) {
                this.arrayToRender = this.sort.sortTable(this.columnToSort, tableData);
            } else {
                this.arrayToRender = tableData;
            }
            this.render.appendRows(this.arrayToRender);
        }
     }

     columnClick(item) {
         this.container = item.parentNode;
         this.siblings = [...this.container.children];

         if (item.classList.contains('sort_up')) {
             item.classList.remove('sort_up');
             item.classList.add('sort_down');
             this.arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(this.arrayToRender);
         } else if (item.classList.contains('sort_down')) {
             item.classList.remove('sort_down');
             this.arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(this.arrayToRender);
         } else {
             this.siblings.forEach(el => {
                 el.classList.remove('sort_up', 'sort_down');
             });
             item.classList.add('sort_up');
             this.arrayToRender = this.sort.sortTable(item, this.sortedArr);
             this.render.appendRows(this.arrayToRender);
         }
     }
}
