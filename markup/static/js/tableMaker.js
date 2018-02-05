// var content = new Object();
var myData = new Object();
myData.tableRows = fillTable();

function fillTable() {
    var rows = [];
    for (i = 0; i < 30; i++) {
        rows.push([
            getRandomCurrency(),
            getRandomCell2(),
            getRandomCell3(),
            getRandomCell4(),
            getRandomCell5(),
            getRandomCell67(),
            getRandomCell67(),
            getRandomCell89(),
            getRandomCell89()
        ]);
    }
    return rows;
}

function getRandomCurrency() {
    var moneyArray = ['GBP', 'JPY', 'USD', 'EUR'];
    var randomIndex = Math.floor(Math.random() * moneyArray.length);
    var firstCurrency = moneyArray[randomIndex];
    moneyArray.splice(randomIndex, 1);
    var secondCurrency = moneyArray[Math.floor(Math.random() * moneyArray.length)];
    return firstCurrency + '/' + secondCurrency
}

function getRandomCell2() {
    var first = Math.random().toFixed(1);
    var second = (Math.random() + 1).toFixed(1);
    return first + ' (' + second + ')'
}

function getRandomCell3() {
    var x = Math.floor(Math.random() * 900) + 1;
    var x = Math.round(x / 10) * 10;
    return x + ' USD'
}

function getRandomCell4() {
    var x = Math.floor(Math.random() * 300) + 1
    var x = Math.round(x / 10) * 10;
    return x + ' 000 USD'
}

function getRandomCell5() {
    return (Math.floor(Math.random() * 9) + 1)
}

function getRandomCell67() {
    var min = -0.99;
    var max = 0.99;
    var rand = (min + Math.random() * (max - min)).toFixed(2).toString();
    if (rand.charAt(rand.length - 1) === '0') {
        rand = rand.substring(0, rand.length - 1);
    }
    if (rand == '-0.0' || rand == '0.0') {
        rand = 0;
    }
    return rand
}

function getRandomCell89() {
    var x = Math.floor(Math.random() * 800) + 100;
    var x = Math.round(x / 10) * 10;
    var y = Math.random().toFixed(2).toString();
    var y = y.substring(2);
    var result = x + ',' + y;
    return result + ' USD'
}

console.log(myData.tableRows);
