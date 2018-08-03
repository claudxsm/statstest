const seedrandom = require('seedrandom');
const _ = require('lodash');

var rng = seedrandom();

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

var getAttributes = () => {
    var attributes = [];
    //roll 6 attributes
    [1,2,3,4,5,6].forEach(i => {
        //roll 4 1d6
        var d6 = [];
        [1,2,3,4].forEach(j => {
            d6.push(roll());
        })
        //drop lowest
        d6 = _(d6).sortBy().takeRight(3).value();
        //sum and save attribute
        attributes.push(sumArray(d6));
    })      
    return sortArray(attributes);
}

function getPBTotal(array) {
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

//HELPERS
function roll(max = 6, min = 1) {
    return Math.floor(rng() * (max - min + 1)) + min;
}

function getMaxNFromArray(array, count = 3) {
    return array.sort((a, b) => {
        return a - b;
    }).slice(-1 * count);
}

function sumArray(array) {
    return array.reduce((total, num) => { return total + num; });
}

function sortArray(array) {
    return array.sort((a, b) => {
        return b - a;
    });
}

module.exports = {
    getAttributes,
    getPBTotal,
    pBCost
}
