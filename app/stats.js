
var getStats = function (results){
    var stats = {
        pbAvg:0,
        naCount: 0,
        total:0,
        rollsTotal: 0,
        rollsOutsideRange: 0,
        pbMin: null,
        pbMax: null
    };
    
    var pbTotal = 0;
    var pbTotalCount = 0;
    var rollsOutsideRange = 0;

    results.forEach(result => {
        if(typeof result.pbTotal === "number"){
            pbTotal += result.pbTotal;
            pbTotalCount += 1;
            if(stats.pbMin == null || result.pbTotal < stats.pbMin) {
                stats.pbMin = result.pbTotal;
            }
            if(stats.pbMax == null || result.pbTotal > stats.pbMax) {
                stats.pbMax = result.pbTotal;
            }
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