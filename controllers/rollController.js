const roller = require('../app/roller');
const stats = require('../app/stats');

var pb = JSON.stringify(roller.pBCost, null, 2);

var getHome = function (req, res) {
    res.render('home.hbs', {
        pb
    });
}

var rollStats = function (req, res) {
    var result = [];
    var minpb = req.body.minpb;
    var maxpb = req.body.maxpb;
    var rollsTotal = 0;
    var rollsOutsideRange = 0;

    while (result.length < req.body.repeat ) {
        rollsTotal +=1;
        var roll = roller.getRollArray();
        var r = {
            roll,
            total: roller.getPBCost(roll)
        };
       if(minpb == 0 && maxpb == 99) {
        result.push(r);
       }
       else if (r.total != "N/A"){
       if(minpb == 0 && r.total < maxpb){
        result.push(r);
       }
       else if(maxpb == 99 && r.total >= minpb ){
        result.push(r);
       }
       else if (r.total >= minpb && r.total <= maxpb) {            
        result.push(r);
       } 
       else {
           rollsOutsideRange +=1;
       }
    }
    }

    var stat = stats.getStats(result);
    console.log(stat);

    res.render('home.hbs', {
        repeat: req.body.repeat,
        minpb,
        maxpb,
        result,
        pb,
        stats: [stat],
        rollsTotal,
        rollsOutsideRange = rollsOutsideRange / rollsTotal * 100
    });
};

module.exports = {
    rollStats,
    getHome
}