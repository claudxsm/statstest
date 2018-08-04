
var getStats = function (results){
    var stats = {
        pbAvg:0,
        naCount: 0,
        total:0,
        rollsTotal: 0,
        rollsOutsideRange: 0
    };
    
    var pbTotal = 0;
    var pbTotalCount = 0;
    var rollsOutsideRange = 0;

    results.forEach(result => {
        if(typeof result.total === "number"){
            pbTotal += result.total;
            pbTotalCount += 1;
        }
        else {
            stats.naCount += 1;
        }
        stats.rollsTotal += result.attempts;
        rollsOutsideRange += result.attempts - 1;
    });
    stats.rollsOutsideRange = (rollsOutsideRange / stats.rollsTotal * 100).toFixed(0);
    stats.pbAvg = pbTotal / pbTotalCount;
    stats.total = results.length;

    return stats;
}


module.exports = {
    getStats
}