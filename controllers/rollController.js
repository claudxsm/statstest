const roller = require('../app/roller');
const stats = require('../app/stats');

var pb = JSON.stringify(roller.pBCost, null, 2);

var getHome = function (req, res) {
    res.render('home.hbs', {
        pbCostList: roller.pBCost
    });
}

var getRoll = function (req, res) {
    var result = [];
    var minpb = req.body.minpb == 0 ? null : req.body.minpb;
    var maxpb = req.body.maxpb == 99 ? null : req.body.maxpb;

    for (let index = 0; index < req.body.repeat; index++) {
        result.push(roller.getAttributes(minpb, maxpb));
    }
 
    var stat = stats.getStats(result);

    res.render('home.hbs', {        
        result,
        pbCostList: roller.pBCost,
        stats: [stat]
    });
};

module.exports = {
    getRoll,
    getHome
} 