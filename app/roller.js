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
    16: 12,
    17: 15,
    18: 19
}


var rollForAttributes = () => {
    var result = {};
    var rolls = [];

    //roll 6 attributes
    [1, 2, 3, 4, 5, 6].forEach(i => {
        //roll 4 1d6
        var fourd6 = [];
        [1, 2, 3, 4].forEach(j => {
            fourd6.push(roll());
        })
        //drop lowest
        threed6 = _(fourd6).map('roll').sortBy().takeRight(3).value();
        //sum
        var attribute = _.sum(threed6);

        rolls.push({ attribute, fourd6 });
    });

    //sort 
    rolls = _.sortBy(rolls, 'attribute');

    result.attributes = _.map(rolls, 'attribute');
    result.all_rolls = _.map(rolls, 'fourd6');
    result.pbTotal = getPBTotal(result.attributes);
    return result;
}

var getAttributes = (minpb = null, maxpb = null) => {
    var attempts = 0;
    var failed_rolls = [];
    var result = null;



    while (result == null) {
        result = rollForAttributes();
        attempts += 1;

        //no min/max - accept anything
        if (minpb == null && maxpb == null) {
            continue;
        }
        //has pbTotal - check min/max
        else if (typeof result.pbTotal === "number") {
            if ((minpb == null && result.pbTotal < maxpb)
                || (maxpb == null && result.pbTotal >= minpb)
                || (result.pbTotal >= minpb && result.pbTotal <= maxpb)) {
                continue;
            }
            else {
                failed_rolls.push(result.all_rolls);
                result = null;
            }
        }
        //has no pbTotal - fail min/max check
        else {
            failed_rolls.push(result.all_rolls);
            result = null;
        }
    }
    result.attempts = attempts;
    result.failed_rolls = failed_rolls;
    return result;
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
    var rng_base = rng();
    return {
        roll: Math.floor(rng_base * (max - min + 1)) + min,
        rng_base
    };
}


module.exports = {
    getAttributes,
    pBCost
}
