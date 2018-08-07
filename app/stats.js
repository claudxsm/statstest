
var getStats = function (results){
    var stats = {
        pbAvg:0,
        naCount: 0,
        total:0,
        rollsTotal: 0,
        rollsOutsideRange: 0,
        minAttributes: {}, 
        maxAttributes: {},
        pbMin: null,
        pbMax: null
    };
    
    var pbTotal = 0;
    var pbTotalCount = 0;
    var rollsOutsideRange = 0;

    results.forEach(result => {

        //pb total
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

        //attribute counts
        var minAttribute = result.attributes[0];
        var maxAttribute = result.attributes.slice(-1)[0];
        if(stats.minAttributes.hasOwnProperty(minAttribute)){
            stats.minAttributes[minAttribute].count += 1;
        }
        else {
            stats.minAttributes[minAttribute] = { count: 1};
        }
        if(stats.maxAttributes.hasOwnProperty(maxAttribute)){
            stats.maxAttributes[maxAttribute].count += 1;
        }
        else {
            stats.maxAttributes[maxAttribute] = { count: 1};
        }       
        
        //roll counts
        stats.rollsTotal += result.attempts;
        rollsOutsideRange += result.attempts - 1;
    });

    stats.rollsOutsideRange = (rollsOutsideRange / stats.rollsTotal * 100).toFixed(0);
    stats.pbAvg = pbTotal / pbTotalCount;
    stats.total = results.length;

    //calculate attribute roll percentages
    for(var attr in stats.minAttributes){
        stats.minAttributes[attr].percent = (stats.minAttributes[attr].count / stats.total * 100).toFixed(1);
    }
    for(var attr in stats.maxAttributes){
        stats.maxAttributes[attr].percent = (stats.maxAttributes[attr].count / stats.total * 100).toFixed(1);
    }

    return stats;
}


module.exports = {
    getStats
}