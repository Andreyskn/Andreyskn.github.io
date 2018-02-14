export default class Sort {
    constructor() {
        this.tableHead = document.getElementsByClassName('table__head-row')[0];
        this.tableHeadCells = [...this.tableHead.children];
    }

    sortTable(columnToSort, arrayToSort) {
        const columnId = this.tableHeadCells.indexOf(columnToSort);

        if (columnToSort.classList.contains('sort_down')) {

            let copyData = arrayToSort.slice();

            // works for columns: 1, 2, 5, 8, 9
            if ([0, 1, 4, 7, 8].includes(columnId)) {
                copyData.sort((a, b) => {
                    return a[columnId] > b[columnId] ? -1 : 1;
                });
            }
            // works for columns: 3, 4
            if ([2, 3].includes(columnId)) {
                copyData.sort((a, b) => {
                    return (parseInt(a[columnId], 10) < parseInt(b[columnId], 10)) ? 1 : -1;
                });
            }
            // works for columns: 6, 7
            if ([5, 6].includes(columnId)) {
                copyData.sort((a, b) => b[columnId] - a[columnId]);
            }

            return copyData;

        } else if (columnToSort.classList.contains('sort_up')) {

            let copyData = arrayToSort.slice();

            // works for columns: 1, 2, 5, 8, 9
            if ([0, 1, 4, 7, 8].includes(columnId)) {
                copyData.sort((a, b) => {
                    return a[columnId] > b[columnId] ? 1 : -1;
                });
            }
            // works for columns: 3, 4
            if ([2, 3].includes(columnId)) {
                copyData.sort((a, b) => {
                    return (parseInt(a[columnId], 10) < parseInt(b[columnId], 10)) ? -1 : 1;
                });
            }
            // works for columns: 6, 7
            if ([5, 6].includes(columnId)) {
                copyData.sort((a, b) => a[columnId] - b[columnId]);
            }

            return copyData;

        } else {
            return arrayToSort;
        }
    }
}
