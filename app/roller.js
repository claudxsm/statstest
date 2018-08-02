var pBCost = {
    3: -9,
    4: -6,
    5: -4,
    6: -2,
    7: -1,
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
    16:12,
    17:15,
    18:19
    //"16" : 12 //no
}

var getRollArray = () => {
    var result = [];
    for (let index = 0; index < 6; index++) {
        var roll4 = [];
        for (let j = 0; j < 4; j++) {
            roll4.push(roll());
        }
        var top3 = getMaxNFromArray(roll4);
        result.push(sumArray(top3));
    }
    return sortArray(result);
}

function roll(max = 6, min = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMaxNFromArray(array, count = 3) {
    return array.sort((a, b) => {
        return a - b;
    }).slice(-1 * count);
}

function sumArray(array) {
    return array.reduce((total, num) => { return total + num; });
}

function getPBCost(array) {
    var total = 0;

    for (let index = 0; index < array.length; index++) {
        if (pBCost[array[index]] !== undefined) {
            total += pBCost[array[index]];
        }
        else {
            total = "N/A";
            break;
        }
    }
    return total;
}

function sortArray(array) {
    return array.sort((a, b) => {
        return b - a;
    });
}

module.exports = {
    getRollArray,
    getPBCost,
    pBCost
}

// var validRolls = [];
// while (validRolls.length < 100) {
//     var array = sortArray(getRollArray());
//     var total = getPBCost(array);
//     if(total >= 25 && total <= 29)
//         validRolls.push(array);
// }
// validRolls.forEach(elem => {
//     console.log(elem, getPBCost(elem));
// })