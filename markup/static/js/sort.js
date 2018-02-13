export default class Sort {
    constructor() {
        this.columnId = null;
        this.tableHead = document.getElementsByClassName('table__head-row')[0];
        this.tableHeadCells = [];
        this.copyData = [];
    }

    sortTable(columnToSort, arrayToSort) {
        if (this.tableHead) {
            this.tableHeadCells = [...this.tableHead.children];
        }
        this.columnId = this.tableHeadCells.indexOf(columnToSort);

        if (columnToSort.classList.contains('sort_down')) {

            this.copyData = arrayToSort.slice();

            //works for columns: 1, 2, 5, 8, 9
            if ([0, 1, 4, 7, 8].includes(this.columnId)) {
                this.copyData.sort((a, b) => {
                    return a[this.columnId] > b[this.columnId] ? -1 : 1;
                    return 0;
                });
            }
            //works for columns: 3, 4
            if ([2, 3].includes(this.columnId)) {
                this.copyData.sort((a, b) => {
                    return (parseInt(a[this.columnId], 10) < parseInt(b[this.columnId], 10)) ? 1 : -1;
                    return 0;
                });
            }
            //works for columns: 6, 7
            if ([5, 6].includes(this.columnId)) {
                this.copyData.sort((a, b) => b[this.columnId] - a[this.columnId]);
            }

            return this.copyData;

        } else if (columnToSort.classList.contains('sort_up')) {

            this.copyData = arrayToSort.slice();

            //works for columns: 1, 2, 5, 8, 9
            if ([0, 1, 4, 7, 8].includes(this.columnId)) {
                this.copyData.sort((a, b) => {
                    return a[this.columnId] > b[this.columnId] ? 1 : -1;
                    return 0;
                });
            }
            //works for columns: 3, 4
            if ([2, 3].includes(this.columnId)) {
                this.copyData.sort((a, b) => {
                    return (parseInt(a[this.columnId], 10) < parseInt(b[this.columnId], 10)) ? -1 : 1;
                    return 0;
                });
            }
            //works for columns: 6, 7
            if ([5, 6].includes(this.columnId)) {
                this.copyData.sort((a, b) => a[this.columnId] - b[this.columnId]);
            }

            return this.copyData;

        } else {
            return arrayToSort;
        }
    }
}
