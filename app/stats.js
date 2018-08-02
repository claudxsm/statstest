
var getStats = function (results){
    var stats = {
        pbAvg:0,
        naCount: 0,
        total:0
    };
    
    var pbTotal = 0;
    var pbTotalCount = 0;

    results.forEach(result => {
        
        if(typeof result.total === "number"){
            pbTotal += result.total;
            pbTotalCount += 1;
        }
        else {
            stats.naCount += 1;
        }
    });
    stats.pbAvg = pbTotal / pbTotalCount;
    stats.total = results.length;

    return stats;
}


module.exports = {
    getStats
}